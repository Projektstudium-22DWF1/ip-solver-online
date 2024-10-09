import React, { useContext } from "react";
import "uikit/dist/css/uikit.min.css";
import { LanguageContext } from "../context/LanguageContext";

function SolveProblemButton({ solveProblem, solveControl }) {
  const { translations } = useContext(LanguageContext);
  console.log(solveControl);

  return (
    <button
      data-testid="solve-problem-button"
      className="uk-button uk-button-secondary uk-button-large"
      disabled={solveControl}
      onClick={solveProblem}
    >
      {translations.solveProblem}
    </button>
  );
}

export default SolveProblemButton;
