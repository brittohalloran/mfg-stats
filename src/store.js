import React from "react";
import { countDigits } from "./stats";

export const Reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_RAW_DATA":
      let rawData = action.payload.replace(/[^0-9.,\n\t ]/g, "");
      let data = rawData
        .split(/[\n\t, ]/)
        .map((v) => parseFloat(v))
        .filter((v) => !isNaN(v));
      let decimalPlaces = Math.max(...data.map((f) => countDigits(f)));
      return {
        ...state,
        rawData: rawData,
        data: data,
        decimalPlaces: decimalPlaces,
        datarevision: state.datarevision + 1,
      };
    case "UPDATE_LSL":
      return {
        ...state,
        lsl: action.payload === "" ? null : action.payload,
        tol_int_type: !(action.payload === "")
          ? state.usl
            ? "both"
            : "upper"
          : state.usl
          ? "lower"
          : "both",
        datarevision: state.datarevision + 1,
      };
    case "UPDATE_USL":
      return {
        ...state,
        usl: action.payload === "" ? null : action.payload,
        tol_int_type: !(action.payload === "")
          ? state.lsl
            ? "both"
            : "lower"
          : state.lsl
          ? "upper"
          : "both",
        datarevision: state.datarevision + 1,
      };
    case "UPDATE_C":
      return {
        ...state,
        conf_level: action.payload === "" ? null : action.payload,
        errors: {
          ...state.errors,
          conf_level:
            action.payload >= 0 && action.payload <= 1
              ? null
              : "Confidence level should be between 0 and 1",
        },
        datarevision: state.datarevision + 1,
      };
    case "UPDATE_P":
      return {
        ...state,
        p: action.payload === "" ? null : action.payload,
        errors: {
          ...state.errors,
          p:
            action.payload >= 0 && action.payload <= 1
              ? null
              : "Proportion conforming should be between 0 and 1",
        },
        datarevision: state.datarevision + 1,
      };
    case "UPDATE_TOL_INT_TYPE":
      return {
        ...state,
        tol_int_type: ["both", "upper", "lower"].includes(action.payload)
          ? action.payload
          : state.tol_int_type,
        datarevision: state.datarevision + 1,
      };

    default:
      return state;
  }
};

const initialState = {
  rawData: "",
  data: [],
  decimalPlaces: 2,
  lsl: null,
  usl: null,
  conf_level: null,
  p: null,
  tol_int_type: "both",
  datarevision: 0,
  errors: {},
};

const Store = ({ children }) => {
  const [state, dispatch] = React.useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = React.createContext(initialState);
export default Store;
