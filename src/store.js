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
        datarevision: state.datarevision + 1,
      };
    case "UPDATE_USL":
      return {
        ...state,
        usl: action.payload === "" ? null : action.payload,
        datarevision: state.datarevision + 1,
      };
    case "UPDATE_C":
      return {
        ...state,
        conf_level: action.payload === "" ? null : action.payload,
        datarevision: state.datarevision + 1,
      };
    case "UPDATE_P":
      return {
        ...state,
        p: action.payload === "" ? null : action.payload,
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
  datarevision: 0,
};

const Store = ({ children }) => {
  const [state, dispatch] = React.useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = React.createContext(initialState);
export default Store;
