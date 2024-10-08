import React, { useContext } from "react";
import "uikit/dist/css/uikit.min.css";
import { LanguageContext } from "../context/LanguageContext"; // Importiere den Kontext

function SolveProblemButton({ solveProblem }) {
  const { translations } = useContext(LanguageContext); // Zugriff auf Übersetzungen

  return (
    <button
      data-testid="solve-problem-button"
      className="uk-button uk-button-secondary uk-button-large"
      onClick={solveProblem}
    >
      {translations.solveProblem} {/* Verwende Übersetzung */}
    </button>
  );
}

export default SolveProblemButton;
