import React from "react";
import "uikit/dist/css/uikit.min.css";

function SolveProblemButton({ solveProblem }) {
  return (
    <button
      className="uk-button uk-button-secondary uk-button-large"
      onClick={solveProblem}
    >
      Solve problem
    </button>
  );
}
export default SolveProblemButton;
