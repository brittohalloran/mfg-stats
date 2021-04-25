import React from "react";
import { Context } from "./store";
import Plot from "react-plotly.js";
import {
  mean,
  sd,
  cpk,
  quantiles,
  shapiroWilk,
  roundDigits,
  roundSigFigs,
  tolerance_interval_factor,
} from "./stats";

function DistributionAnalysis() {
  const ctx = React.useContext(Context);
  const state = ctx[0];

  const k = tolerance_interval_factor(
    parseFloat(state.conf_level),
    parseFloat(state.p),
    state.data.length,
    !(state.lsl && state.usl)
  );

  let limitLines = [];
  let annotations = [];
  [state.lsl, state.usl].forEach((v) => {
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
          line: { color: "#cc4125" },
        },
      ]);
      annotations = annotations.concat([
        {
          x: v,
          y: 0.95,
          xref: "x",
          yref: "paper",
          text: v,
          showarrow: false,
          font: { color: "#cc4125" },
        },
      ]);
    }
  });

  let [x, q] = quantiles(state.data);
  const shapiroWilkP = state.data.length > 3 ? shapiroWilk(state.data) : null;
  return (
    <div className="row mt-4">
      <div className="col-12">
        <div className="row">
          <div className="col-md-6">
            <h5 className="text-uppercase font-weight-bold">
              Normal Probability
            </h5>
            <Plot
              data={[
                {
                  type: "scatter",
                  mode: "markers",
                  x: q,
                  y: x,
                  marker: { color: "#afd3e7" },
                },
              ]}
              layout={{
                autosize: false,
                paper_bgcolor: "#f5f5f5",
                plot_bgcolor: "#f5f5f5",
                width: 540,

                margin: { l: 40, r: 20, b: 40, t: 20 },
                xaxis: { zeroline: false, title: "Theoretical Quantiles" },
                yaxis: { zeroline: false },
              }}
              config={{ displaylogo: false }}
            />
            <table className="table table-sm text-mono small mt-4">
              <thead>
                <tr>
                  <th className="text-center">Test</th>
                  <th className="text-center">Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Shapiro-Wilk</td>
                  <td>
                    {shapiroWilkP ? (
                      <span>
                        p = {roundSigFigs(shapiroWilkP, 2)} (
                        {shapiroWilkP < 0.05 ? "not " : null}normal)
                      </span>
                    ) : null}
                  </td>
                </tr>
              </tbody>
            </table>

            <h6 className="mt-5 text-uppercase font-weight-bold">Learn</h6>
            <p>
              This panel is intended to help determine the likelihood that the
              input data is a sample from a{" "}
              <a href="https://en.wikipedia.org/wiki/Normal_distribution">
                normally distributed
              </a>{" "}
              population. These tests are hypothesis tests where the null
              hypothesis is that the data is a sample from a normal
              distribution. If <code>p</code> is below some threshold (typically{" "}
              <code>p &lt; 0.05</code>), then we reject the null hypothesis and
              conclude that it is unlikely the data is a sample from a normally
              distributed population.
            </p>
          </div>
          <div className="col-md-6">
            <h5 className="text-uppercase font-weight-bold">
              Capability Study
            </h5>
            <Plot
              data={[
                {
                  type: "histogram",
                  x: state.data,
                  marker: { color: "#afd3e7" },
                },
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
                datarevision: state.datarevision,
              }}
              config={{ displaylogo: false }}
            />
            <table className="table table-sm text-mono small mt-4">
              <thead>
                <tr>
                  <th className="text-center">Attribute</th>
                  <th className="text-center">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>n</td>
                  <td>{state.data.length}</td>
                </tr>
                <tr>
                  <td style={{ width: "40%" }}>Mean</td>
                  <td>
                    {state.data.length > 0
                      ? roundDigits(
                          mean(state.data) || 0,
                          state.decimalPlaces + 1
                        )
                      : null}
                  </td>
                </tr>
                <tr>
                  <td>Standard deviation</td>
                  <td>
                    {state.data.length > 0
                      ? roundSigFigs(sd(state.data) || 0, 2)
                      : null}
                  </td>
                </tr>
                <tr>
                  <td>Cpk</td>
                  <td>
                    {state.data.length > 0
                      ? roundDigits(
                          cpk(
                            mean(state.data),
                            sd(state.data),
                            state.lsl,
                            state.usl
                          ) || 0,
                          2
                        )
                      : null}
                  </td>
                </tr>
                {k ? (
                  <tr>
                    <td>k-factor</td>
                    <td>{roundDigits(k, 3)}</td>
                  </tr>
                ) : null}
                {k ? (
                  <tr>
                    <td>Tolerance interval</td>
                    <td>
                      {roundDigits(
                        mean(state.data) - k * sd(state.data),
                        state.decimalPlaces + 1
                      )}{" "}
                      -{" "}
                      {roundDigits(
                        mean(state.data) + k * sd(state.data),
                        state.decimalPlaces + 1
                      )}
                    </td>
                  </tr>
                ) : null}
                <tr>
                  <td>Ordered data</td>
                  <td>
                    {state.data
                      ? state.data
                          .sort((a, b) => a - b)
                          .map((v) => roundDigits(v, state.decimalPlaces))
                          .join(", ")
                      : null}
                  </td>
                </tr>
              </tbody>
            </table>
            <h6 className="mt-5 text-uppercase font-weight-bold">Learn</h6>
            <p>
              On this panel we look at a histogram of the data and overlay any
              specification limits. The graphical output gives a quick visual
              indication of where the data lies relative to the specification
              limits.
            </p>
            <p>
              The process capability index, <i>Cpk</i>, is a measure of how
              closely the data lies to its specified limits. A Cpk of 1 means
              that the mean of the data is 3 standard deviations away from its
              closest limit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DistributionAnalysis;
