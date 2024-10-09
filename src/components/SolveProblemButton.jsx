import React, { useContext } from "react";
import "uikit/dist/css/uikit.min.css";
import { LanguageContext } from "../context/LanguageContext";

function SolveProblemButton({ solveProblem }) {
  const { translations } = useContext(LanguageContext);

  return (
    <button
      data-testid="solve-problem-button"
      className="uk-button uk-button-secondary uk-button-large"
      onClick={solveProblem}
    >
      {translations.solveProblem}
    </button>
  );
}

export default SolveProblemButton;
