import React from "react";
import { Context } from "./store";
import { mean, std, format } from "mathjs";
import Plot from "react-plotly.js";

const cpk = (m, sd, lsl, usl) => {
  const lower = lsl ? (m - lsl) / (3 * sd) : null;
  const upper = usl ? (usl - m) / (3 * sd) : null;
  return lower ? (upper ? Math.min(lower, upper) : lower) : null;
};

function DistributionAnalysis() {
  const ctx = React.useContext(Context);
  const state = ctx[0];

  let shapes = [state.lsl, state.usl].map(v => {
    return v
      ? {
          type: "line",
          x0: v,
          x1: v,
          y0: 0,
          y1: 0.9,
          yref: "paper",
          line: { color: "red" }
        }
      : null;
  });

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
              Data: {state.data ? state.data.join(", ") : null} (n ={" "}
              {state.data ? state.data.length : 0})
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
            <p className="mb-0">
              Cpk ={" "}
              {state.data.length > 0
                ? format(
                    cpk(
                      mean(state.data),
                      std(state.data),
                      state.lsl,
                      state.usl
                    ) || 0,
                    {
                      notation: "fixed",
                      precision: 3
                    }
                  )
                : null}
            </p>
            <p>
              Specification limits ={" "}
              {state.lsl
                ? state.usl
                  ? state.lsl + " to " + state.usl
                  : state.lsl + " min"
                : state.usl
                ? state.usl + " max"
                : null}
            </p>
            <Plot
              data={[
                {
                  type: "histogram",
                  x: state.data,
                  marker: { color: "rgba(0,0,0,0.3)" }
                }
              ]}
              layout={{
                autosize: false,
                width: 540,
                margin: { l: 30, r: 20, b: 30, t: 20 },
                shapes: shapes
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
