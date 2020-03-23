import React from "react";
import InputArea from "./InputArea";
import DistributionAnalysis from "./DistributionAnalysis";
import Store from "./store";

function App() {
  return (
    <Store>
      <div className="container pt-4 pb-4">
        <InputArea />
        <DistributionAnalysis />
      </div>
    </Store>
  );
}

export default App;
