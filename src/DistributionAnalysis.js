import React from "react";
import { Context } from "./store";
import { mean, std, format } from "mathjs";
import Plot from "react-plotly.js";

function DistributionAnalysis() {
  const ctx = React.useContext(Context);
  const state = ctx[0];

  return (
    <div className="row">
      <div className="col-12">
        <h3 className="text-uppercase font-weight-bold">
          Distribution Analysis
        </h3>
        <div className="row">
          <div className="col-md-6">
            <h5>Normal probability</h5>
          </div>
          <div className="col-md-6">
            <h5>Capability to Spec</h5>
            <p className="mb-0 text-mono">
              n = {state.data ? state.data.length : 0} observations
            </p>
            <p className="mb-0">
              Mean ={" "}
              {state.data.length > 0
                ? format(mean(state.data) || 0, {
                    notation: "fixed",
                    precision: 2
                  })
                : null}
            </p>
            <p className="mb-0">
              SD ={" "}
              {state.data.length > 0
                ? format(std(state.data) || 0, {
                    notation: "fixed",
                    precision: 2
                  })
                : null}
            </p>
            <p>
              Specification limits = ({state.lsl}, {state.usl})
            </p>
            <Plot
              data={[{ type: "histogram", x: state.data }]}
              layout={{
                autosize: false,
                width: 540,
                margin: { l: 30, r: 20, b: 30, t: 20 },
                shapes: [
                  {
                    type: "line",
                    x0: state.lsl,
                    x1: state.lsl,
                    y0: 0,
                    y1: 0.9,
                    yref: "paper",
                    line: { color: "red" }
                  },
                  {
                    type: "line",
                    x0: state.usl,
                    x1: state.usl,
                    y0: 0,
                    y1: 0.9,
                    yref: "paper",
                    line: { color: "red" }
                  }
                ]
              }}
              config={{ displaylogo: false }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DistributionAnalysis;
