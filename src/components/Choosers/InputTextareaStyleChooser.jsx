import React from "react";
import Chooser from "./Chooser";

function ImportTextareaStyleChooser({ setTextareaStyle }) {
    const solverOptions = [
        { value: "Guided", label: "Guided" },
        { value: "Raw", label: "Raw" },
    ];

    return (
        <Chooser 
            options={solverOptions} 
            onChange={ setTextareaStyle } 
            label="Input Textbox Style" 
        />
    );
}

export default ImportTextareaStyleChooser;
