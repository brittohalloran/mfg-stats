import React from "react";
import { Context } from "./store";

function InputArea() {
  const [state, dispatch] = React.useContext(Context);

  const handleFormChange = (actionType, value) => {
    dispatch({ type: actionType, payload: value });
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <h3 className="text-uppercase font-weight-bold">Input</h3>
        <form>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>
                  Raw data
                  <br />
                  <small className="font-italic">
                    Paste directly from Excel. One datapoint per line.
                  </small>
                </label>

                <textarea
                  className="form-control"
                  onChange={e => {
                    handleFormChange("UPDATE_RAW_DATA", e.target.value);
                  }}
                  value={state.rawData}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Lower Spec Limit</label>
                <input
                  className="form-control"
                  onChange={e => {
                    handleFormChange("UPDATE_LSL", e.target.value);
                  }}
                  value={state.lsl || ""}
                />
              </div>
              <div className="form-group">
                <label>Upper Spec Limit</label>
                <input
                  className="form-control"
                  onChange={e => {
                    handleFormChange("UPDATE_USL", e.target.value);
                  }}
                  value={state.usl || ""}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Confidence Level</label>
                <input className="form-control" />
              </div>
              <div className="form-group">
                <label>Proportion Conforming</label>
                <input className="form-control" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InputArea;
