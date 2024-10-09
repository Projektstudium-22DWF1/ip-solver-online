import React, { useContext } from "react";
import { SolverOptions } from "../../services/SolverInterface";
import Chooser from "./Chooser";
import { LanguageContext } from "../../context/LanguageContext";

function SolverChooser({ solverOption, setSolverOption }) {
  const { translations } = useContext(LanguageContext);

  const solverOptions = [
    { value: SolverOptions.HIGHS, label: SolverOptions.HIGHS },
    { value: SolverOptions.GLPK, label: SolverOptions.GLPK },
  ];

  return (
    <Chooser
      options={solverOptions}
      onChange={setSolverOption}
      label={translations.solverOptions}
      value={solverOption}
    />
  );
}

export default SolverChooser;
