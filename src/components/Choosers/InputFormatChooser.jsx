import Chooser from "./Chooser";
import React, {useEffect} from "react";
import { InputOptions } from "../../services/SolverInterface";

function InputFormatChooser({ inputFormat, setInputFormat, textAreaStyle }) {
    // Bedingte Optionen: Nur "LP" erlauben, wenn "Guided" ausgewählt ist
    const inputOptions = textAreaStyle === "Guided"
        ? [{ value: InputOptions.LP, label: InputOptions.LP }]
        : [
            { value: InputOptions.GMPL, label: InputOptions.GMPL },
            { value: InputOptions.LP, label: InputOptions.LP },
        ];
        
        useEffect(() => {
            if (textAreaStyle === "Guided") {
                setInputFormat(InputOptions.LP);
            }
        }, [textAreaStyle, setInputFormat]); // Der Hook wird ausgeführt, wenn textAreaStyle sich ändert
    
    return (
        <Chooser 
            options={inputOptions} 
            onChange={ setInputFormat } 
            label="Input Format Options" 
            value={ inputFormat }
        />
    );
}

export default InputFormatChooser;