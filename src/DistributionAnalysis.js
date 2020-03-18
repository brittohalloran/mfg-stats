import React from "react";
import { Context } from "./store";

function DistributionAnalysis() {
  const [state, dispatch] = React.useContext(Context);
  let data = state.rawData.split("\n").map(v => parseFloat(v));
  const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
  let mean = average(data) || 0;
  return (
    <div className="col-9">
      <h3 className="text-uppercase font-weight-bold">Distribution Analysis</h3>
      <div className="row">
        <div className="col-6">
          <h5>Normal probability</h5>
        </div>
        <div className="col-6">
          <h5>Capability</h5>
          <p>Mean = {mean}</p>
          <p>
            Specifications = ({state.lsl}, {state.usl})
          </p>
        </div>
      </div>
    </div>
  );
}

export default DistributionAnalysis;
