import React from "react";
import { Context } from "./store";
import { mean, std, format } from "mathjs";

function DistributionAnalysis() {
  const [state, dispatch] = React.useContext(Context);

  const d3Cont = React.useRef(null);

  return (
    <div className="row">
      <div className="col-12">
        <h3 className="text-uppercase font-weight-bold">
          Distribution Analysis
        </h3>
        <div className="row">
          <div className="col-6">
            <h5>Normal probability</h5>
          </div>
          <div className="col-6">
            <h5>Capability to Spec</h5>
            <p>n = {state.data ? state.data.length : 0}</p>
            <p>
              Mean ={" "}
              {state.data.length > 0
                ? format(mean(state.data) || 0, {
                    notation: "fixed",
                    precision: 2
                  })
                : null}
            </p>
            <p>
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
            <div ref={d3Cont}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DistributionAnalysis;
