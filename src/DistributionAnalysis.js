import React from "react";
import { Context } from "./store";
import { mean, std, format } from "mathjs";
import Plot from "react-plotly.js";
import { cpk, quantiles } from "./stats";

function DistributionAnalysis() {
  const ctx = React.useContext(Context);
  const state = ctx[0];

  let limitLines = [];
  let annotations = [];
  [state.lsl, state.usl].forEach(v => {
    if (v) {
      limitLines = limitLines.concat([
        {
          type: "line",
          x0: v,
          x1: v,
          y0: 0,
          y1: 0.9,
          xref: "x",
          yref: "paper",
          line: { color: "#cc4125" }
        }
      ]);
      annotations = annotations.concat([
        {
          x: v,
          y: 0.95,
          xref: "x",
          yref: "paper",
          text: v,
          showarrow: false,
          font: { color: "#cc4125" }
        }
      ]);
    }
  });

  let [x, q] = quantiles(state.data);
  return (
    <div className="row mt-4">
      <div className="col-12">
        <h4 className="text-uppercase font-weight-bold">
          Distribution Analysis
        </h4>
        <div className="row">
          <div className="col-md-6">
            <h5 className="text-center">Normal Probability</h5>
            <Plot
              data={[
                {
                  type: "scatter",
                  mode: "markers",
                  x: q,
                  y: x,
                  marker: { color: "#A0C0D2" }
                }
              ]}
              layout={{
                autosize: false,
                paper_bgcolor: "#f5f5f5",
                plot_bgcolor: "#f5f5f5",
                width: 540,

                margin: { l: 40, r: 20, b: 40, t: 20 },
                xaxis: { zeroline: false, title: "Theoretical Quantiles" },
                yaxis: { zeroline: false }
              }}
              config={{ displaylogo: false }}
            />
          </div>
          <div className="col-md-6">
            <h5 className="text-center">Capability Study</h5>
            <Plot
              data={[
                {
                  type: "histogram",
                  x: state.data,
                  marker: { color: "#afd3e7" }
                }
              ]}
              layout={{
                autosize: false,
                paper_bgcolor: "#f5f5f5",
                plot_bgcolor: "#f5f5f5",
                width: 540,
                margin: { l: 30, r: 20, b: 30, t: 20 },
                shapes: limitLines,
                annotations: annotations,
                xaxis: { rangemode: "nonnegative" },
                yaxis: { rangemode: "nonnegative" },
                datarevision: state.datarevision
              }}
              config={{ displaylogo: false }}
            />
            <p className="mb-0 text-mono">
              Data:{" "}
              {state.data ? state.data.sort((a, b) => a - b).join(", ") : null}{" "}
              (n = {state.data ? state.data.length : 0})
              <br />
              Mean ={" "}
              {state.data.length > 0
                ? format(mean(state.data) || 0, {
                    notation: "fixed",
                    precision: 2
                  })
                : null}
              <br />
              SD ={" "}
              {state.data.length > 0
                ? format(std(state.data) || 0, {
                    notation: "fixed",
                    precision: 2
                  })
                : null}
              <br />
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
              <br />
              Specification limits ={" "}
              {state.lsl
                ? state.usl
                  ? state.lsl + " to " + state.usl
                  : state.lsl + " min"
                : state.usl
                ? state.usl + " max"
                : null}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DistributionAnalysis;
