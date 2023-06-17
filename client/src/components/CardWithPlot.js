import React, { useState } from "react";
import ScatterPlot from "./ScatterPlot";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

// [2,3],[10,20],[22,33],[50,10],[60,20]
function CardWithPlot({
  handleSubmit,
  points,
  setPoints,
  plotData,
  setPlotData,
  setBottomMsg,
  errorMsg,
  setErrorMsg,
  bottomMsg,
  plotTitle,
  prime,
  setErrorPrime
}) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setErrorMsg("");
    setBottomMsg("");
    setPoints("");
    setPlotData("");
  };

  return (
    <div className="rounded-rectangle">
      <div className="card-plot">
        <ScatterPlot plotData={plotData} points={points} />
      </div>
      <p className="plot-title">{plotTitle}</p>
      <div className="input-group input-group-sm justify-content-end mt-auto">
        <input
          type="text"
          className="form-control rounded-left"
          placeholder="Enter set of points: [2,3],[10,20],[22,33]"
          value={inputValue}
          onChange={handleInputChange}
        />

        <button
          className="btn btn-primary rounded-right"
          onClick={() => handleSubmit(inputValue, prime, setErrorPrime)}
        >
          Send
        </button>
      </div>
      {errorMsg && <p className="error-message text-center mt-2">{errorMsg}</p>}
      {bottomMsg && (
        <div className="poly-container">
          {" "}
          <p className="poly-message text-center mt-3">
            {" "}
            <InlineMath>{bottomMsg}</InlineMath>
          </p>
        </div>
      )}
    </div>
  );
}

export default CardWithPlot;
