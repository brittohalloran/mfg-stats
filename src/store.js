import React from "react";

export const Reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_RAW_DATA":
      return { ...state, rawData: action.payload };
    case "UPDATE_LSL":
      return { ...state, lsl: action.payload };
    case "UPDATE_USL":
      return { ...state, usl: action.payload };
    default:
      return state;
  }
};

const initialState = {
  rawData: ""
};

const Store = ({ children }) => {
  const [state, dispatch] = React.useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = React.createContext(initialState);
export default Store;
