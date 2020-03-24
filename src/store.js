import React from "react";

export const Reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_RAW_DATA":
      let rawData = action.payload.replace(/[^0-9.,\n\t ]/g, "");
      let data = rawData
        .split(/[\n\t, ]/)
        .filter(Number)
        .map(v => parseFloat(v));
      return {
        ...state,
        rawData: rawData,
        data: data,
        datarevision: state.datarevision + 1
      };
    case "UPDATE_LSL":
      return {
        ...state,
        lsl: action.payload === "" ? null : action.payload,
        datarevision: state.datarevision + 1
      };
    case "UPDATE_USL":
      return {
        ...state,
        usl: action.payload === "" ? null : action.payload,
        datarevision: state.datarevision + 1
      };
    default:
      return state;
  }
};

const initialState = {
  rawData: "",
  data: [],
  lsl: null,
  usl: null,
  datarevision: 0
};

const Store = ({ children }) => {
  const [state, dispatch] = React.useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = React.createContext(initialState);
export default Store;
