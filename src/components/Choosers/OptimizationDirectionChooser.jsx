import React from "react";
import Chooser from "./Chooser";

function OptimizationDirectionChooser({ optimizationDirection, setOptimizationDirection }) {
    const solverOptions = [
        { value: "Maximize", label: "Maximize" },
        { value: "Minimize", label: "Minimize" },
    ];

    return (
        <Chooser 
            options={solverOptions} 
            onChange={ setOptimizationDirection } 
            label="Optimization Direction" 
            value={ optimizationDirection }
        />
    );
}

export default OptimizationDirectionChooser;
