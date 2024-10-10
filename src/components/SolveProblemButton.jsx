import React, { useContext, useEffect } from "react";
import "uikit/dist/css/uikit.min.css";
import { LanguageContext } from "../context/LanguageContext";


function SolveProblemButton({ solveProblem, solveControl, textAreaStyle, setErrorData }) {
  const { translations } = useContext(LanguageContext);
  // disabled-button
  // {textareaStyle === "Guided" ? translations.raw : translations.guided}
  // console.log(solveControl);
  
  // useEffect(() => {
  //   if (textAreaStyle) {
  //     console.log("TextAreaStyle updated:", textAreaStyle);
  //   }
  // }, [textAreaStyle]);


  return (
    <button
      data-testid="solve-problem-button"
      onClick={() => {
        solveProblem();
        setErrorData("");
      }}
      className={`uk-button uk-button-secondary uk-button-large ${solveControl && textAreaStyle === "Guided" ? "disabled-button" : ""}`}
      disabled={solveControl && textAreaStyle === "Guided"}
    >
      {translations.solveProblem}
    </button>
  );
}

export default SolveProblemButton;
