import React, { useContext } from "react";
import Chooser from "./Chooser";
import { LanguageContext } from "../../context/LanguageContext";

function OptimizationDirectionChooser({
  optimizationDirection,
  setOptimizationDirection
}) {
  const { translations } = useContext(LanguageContext); // Access translations from context

  const solverOptions = [
    { value: "Maximize", label: "Maximize" },
    { value: "Minimize", label: "Minimize" },
  ];

  return (
    <div className="uk-margin-top">
      <Chooser
        options={solverOptions}
        onChange={setOptimizationDirection}
        label={translations.optimizationDirection}
        value={optimizationDirection}
      />
    </div>
  );
}

export default OptimizationDirectionChooser;
