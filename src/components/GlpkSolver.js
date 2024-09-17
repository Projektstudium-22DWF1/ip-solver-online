import React, { useState } from 'react';
import View from './View';  // Importiere die View-Komponente
import { solve, SolverOptions } from './../services/SolverInterface';  // Importiere die View-Komponente

const GlpkSolver = () => {
    const [inputData, setInputData] = useState("");
    const [outputData, setOutputData] = useState(null);
    const [inputFormat, setInputFormat] = useState("GMPL");

    const solveProblem = async () => {
        try {
            const result = await solve(inputData, inputFormat, SolverOptions.GLPK);
            
            setOutputData(JSON.stringify(result, null, 2));
        } catch (error) {
            setOutputData(`Fehler: ${error.message}`);
        }
    };

return (
    <View
        inputFormat={inputFormat}
        setInputFormat={setInputFormat}
        inputData={inputData}
        setInputData={setInputData}
        solveProblem={solveProblem}
        outputData={outputData}
    />
);
};

export default GlpkSolver;
