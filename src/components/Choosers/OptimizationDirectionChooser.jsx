import React from "react";
import Chooser from "./Chooser";

function OptimizationDirectionChooser({ setOptimizationDirection }) {
    const solverOptions = [
        { value: "Maximize", label: "Maximize" },
        { value: "Minimize", label: "Minimize" },
    ];

    return (
        <Chooser 
            options={solverOptions} 
            onChange={ setOptimizationDirection } 
            label="Input Textbox Style" 
        />
    );
}

export default OptimizationDirectionChooser;
