import React, { useContext, useEffect } from "react";
import "uikit/dist/css/uikit.min.css";
import { LanguageContext } from "../context/LanguageContext";

function SolveProblemButton({ solveProblem, solveControl, textAreaStyle }) {
  const { translations } = useContext(LanguageContext);
  // disabled-button
  // {textareaStyle === "Guided" ? translations.raw : translations.guided}

  useEffect(() => {
    if (textAreaStyle) {
      console.log("TextAreaStyle updated:", textAreaStyle);
    }
  }, [textAreaStyle]);


  return (
    <button
      data-testid="solve-problem-button"
      className={`uk-button uk-button-secondary uk-button-large ${solveControl ? "disabled-button" : ""}`}
      disabled={solveControl && textAreaStyle === "Guided"}
      onClick={solveProblem}
    >
      {translations.solveProblem}
    </button>
  );
}

export default SolveProblemButton;
