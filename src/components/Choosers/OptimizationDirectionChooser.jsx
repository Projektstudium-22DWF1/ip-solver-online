import React, { useContext } from "react";
import Chooser from "./Chooser";
import { LanguageContext } from "../../context/LanguageContext"; // Import the LanguageContext

function OptimizationDirectionChooser({
  optimizationDirection,
  setOptimizationDirection,
}) {
  const { translations } = useContext(LanguageContext); // Access translations

  const solverOptions = [
    { value: "Maximize", label: "Maximize" },
    { value: "Minimize", label: "Minimize" },
  ];

  return (
    <div className="uk-margin-top"> {/* UIkit class for top margin */}
      <Chooser
        options={solverOptions}
        onChange={setOptimizationDirection}
        label={translations.optimizationDirection} // Use translation
        value={optimizationDirection}
      />
    </div>
  );
}

export default OptimizationDirectionChooser;
