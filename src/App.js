import React from "react";
import InputArea from "./InputArea";
import DistributionAnalysis from "./DistributionAnalysis";
import Store from "./store";
import "./App.css";

function App() {
  return (
    <Store>
      <div className="container pt-4">
        <div className="row">
          <InputArea />
          <DistributionAnalysis />
        </div>
      </div>
    </Store>
  );
}

export default App;
