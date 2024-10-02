import React, { useContext } from "react";
import { SolverOptions } from "../../services/SolverInterface";
import Chooser from "./Chooser";
import { LanguageContext } from "../../context/LanguageContext"; // Importiere den LanguageContext

function SolverChooser({ solverOption, setSolverOption }) {
  const { translations } = useContext(LanguageContext); // Zugriff auf Übersetzungen

  const solverOptions = [
    { value: SolverOptions.HIGHS, label: SolverOptions.HIGHS },
    { value: SolverOptions.GLPK, label: SolverOptions.GLPK },
  ];

  return (
    <Chooser
      options={solverOptions}
      onChange={setSolverOption}
      label={translations.solverOptions} // Verwende die Übersetzung
      value={solverOption}
    />
  );
}

export default SolverChooser;
