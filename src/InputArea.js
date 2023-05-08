import React from "react";
import { Context } from "./store";

function InputArea() {
  const [state, dispatch] = React.useContext(Context);

  const handleFormChange = (actionType, value) => {
    dispatch({ type: actionType, payload: value });
  };

  const fillExampleData = (e) => {
    // Iris dataset: Sepal length
    e.preventDefault();
    dispatch({
      type: "UPDATE_RAW_DATA",
      payload:
        "4.3, 4.4, 4.4, 4.4, 4.5, 4.6, 4.6, 4.6, 4.6, 4.7, 4.7, 4.8, 4.8, 4.8, 4.8, 4.8, 4.9, 4.9, 4.9, 4.9, 4.9, 4.9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5.1, 5.1, 5.1, 5.1, 5.1, 5.1, 5.1, 5.1, 5.1, 5.2, 5.2, 5.2, 5.2, 5.3, 5.4, 5.4, 5.4, 5.4, 5.4, 5.4, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.6, 5.6, 5.6, 5.6, 5.6, 5.6, 5.7, 5.7, 5.7, 5.7, 5.7, 5.7, 5.7, 5.7, 5.8, 5.8, 5.8, 5.8, 5.8, 5.8, 5.8, 5.9, 5.9, 5.9, 6, 6, 6, 6, 6, 6, 6.1, 6.1, 6.1, 6.1, 6.1, 6.1, 6.2, 6.2, 6.2, 6.2, 6.3, 6.3, 6.3, 6.3, 6.3, 6.3, 6.3, 6.3, 6.3, 6.4, 6.4, 6.4, 6.4, 6.4, 6.4, 6.4, 6.5, 6.5, 6.5, 6.5, 6.5, 6.6, 6.6, 6.7, 6.7, 6.7, 6.7, 6.7, 6.7, 6.7, 6.7, 6.8, 6.8, 6.8, 6.9, 6.9, 6.9, 6.9, 7, 7.1, 7.2, 7.2, 7.2, 7.3, 7.4, 7.6, 7.7, 7.7, 7.7, 7.7, 7.9",
    });
    dispatch({ type: "UPDATE_LSL", payload: 3 });
    dispatch({ type: "UPDATE_USL", payload: 9 });
    dispatch({ type: "UPDATE_C", payload: 0.9 });
    dispatch({ type: "UPDATE_P", payload: 0.95 });
  };
  const clearData = () => {
    dispatch({ type: "UPDATE_RAW_DATA", payload: "" });
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <h4 className="text-uppercase font-weight-bold">Input</h4>
        <form>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Raw data
                  <br />
                  <small className="font-italic">
                    Paste one dataset directly from Excel. Either one datapoint
                    per line or comma separated.{" "}
                    <span
                      className="text-link"
                      onClick={(e) => {
                        fillExampleData(e);
                      }}
                    >
                      See an example dataset
                    </span>
                    .
                  </small>
                </label>

                <textarea
                  className="form-control"
                  onChange={(e) => {
                    handleFormChange("UPDATE_RAW_DATA", e.target.value);
                  }}
                  value={state.rawData}
                  style={{ height: "7.5em" }}
                />
                {state.data.length > 0 ? (
                  <p className="small font-italic mt-2">
                    {state.data.length} observations.{" "}
                    <span
                      className="text-link"
                      onClick={() => {
                        clearData();
                      }}
                    >
                      Clear data
                    </span>
                    .
                  </p>
                ) : null}
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>Lower Spec Limit</label>
                <input
                  className="form-control"
                  onChange={(e) => {
                    handleFormChange("UPDATE_LSL", e.target.value);
                  }}
                  value={state.lsl || ""}
                />
              </div>
              <div className="form-group">
                <label>Upper Spec Limit</label>
                <input
                  className="form-control"
                  onChange={(e) => {
                    handleFormChange("UPDATE_USL", e.target.value);
                  }}
                  value={state.usl || ""}
                />
                <span className="small font-italic text-danger">
                  {state.usl &&
                  state.lsl &&
                  parseFloat(state.usl) < parseFloat(state.lsl)
                    ? "USL should be greater than LSL"
                    : null}
                </span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>Tolerance Interval Type</label>
                <select
                  className="form-control"
                  onChange={(e) => {
                    handleFormChange("UPDATE_TOL_INT_TYPE", e.target.value);
                  }}
                  value={state.tol_int_type}
                >
                  <option value="both">Two-sided</option>
                  <option value="upper">One-sided (upper)</option>
                  <option value="lower">One-sided (lower)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Confidence Level (C)</label>
                <input
                  className="form-control"
                  onChange={(e) => {
                    handleFormChange("UPDATE_C", e.target.value);
                  }}
                  value={state.conf_level || ""}
                />
                <span className="small font-italic text-danger">
                  {state.errors.conf_level}
                </span>
              </div>

              <div className="form-group">
                <label>Proportion Conforming (P)</label>
                <input
                  className="form-control"
                  onChange={(e) => {
                    handleFormChange("UPDATE_P", e.target.value);
                  }}
                  value={state.p || ""}
                />
                <span className="small font-italic text-danger">
                  {state.errors.p}
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InputArea;
