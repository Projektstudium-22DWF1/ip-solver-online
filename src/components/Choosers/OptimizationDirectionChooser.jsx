import React, { useContext } from "react";
import Chooser from "./Chooser";
import { LanguageContext } from "../../context/LanguageContext"; // Importiere den LanguageContext

function OptimizationDirectionChooser({
  optimizationDirection,
  setOptimizationDirection,
}) {
  const { translations } = useContext(LanguageContext); // Zugriff auf Übersetzungen

  const solverOptions = [
    { value: "Maximize", label: "Maximize" },
    { value: "Minimize", label: "Minimize" },
  ];

  return (
    <Chooser
      options={solverOptions}
      onChange={setOptimizationDirection}
      label={translations.optimizationDirection} // Verwende die Übersetzung
      value={optimizationDirection}
    />
  );
}

export default OptimizationDirectionChooser;
