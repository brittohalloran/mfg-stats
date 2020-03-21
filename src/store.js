import React from "react";

export const Reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_RAW_DATA":
      let data = action.payload
        .split(/[\n,]/)
        .filter(Number)
        .map(v => parseFloat(v));
      return { ...state, rawData: action.payload, data: data };
    case "UPDATE_LSL":
      return { ...state, lsl: action.payload };
    case "UPDATE_USL":
      return { ...state, usl: action.payload };
    default:
      return state;
  }
};

const initialState = {
  rawData: "",
  data: []
};

const Store = ({ children }) => {
  const [state, dispatch] = React.useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = React.createContext(initialState);
export default Store;
