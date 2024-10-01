import React from "react";
import { SolverOptions } from "../../services/SolverInterface";
import Chooser from "./Chooser";

function SolverChooser({ solverOption, setSolverOption }) {
    const solverOptions = [
        { value: SolverOptions.HIGHS, label: SolverOptions.HIGHS },
        { value: SolverOptions.GLPK, label: SolverOptions.GLPK },
    ];

    return (
        <Chooser 
            options={solverOptions} 
            onChange={setSolverOption} 
            label="Solver Options" 
            value={solverOption}
        />
    );
}

export default SolverChooser;
