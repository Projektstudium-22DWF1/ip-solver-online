import React, { useState } from "react";
import View from "./View";
import { solve, SolverOptions } from "../services/SolverInterface";


export const solveHighsProblem = async (inputData, inputFormat, solver) => {
  try {
    console.log("SOLVER: " + solver);
    const startTime = performance.now();
    const result = await solve(inputData, inputFormat, SolverOptions[solver]);
    const endTime = performance.now();
    result["Walltime"] = (endTime - startTime) / 1000;

    return result; // Rückgabe des Ergebnisses
  } catch (error) {
    return { error: error.message };
  }
};



const HighsSolver = () => {
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState(null);
  const [inputFormat, setInputFormat] = useState("GMPL");

  const solveProblem = async (inputData, inputFormat) => {
    try {
      const startTime = performance.now();
      const result = await solve(inputData, inputFormat, SolverOptions.HIGHS);
      const endTime = performance.now();
      result["Walltime"] = (endTime - startTime) / 1000;

      setOutputData(result); // Store the result as an object
    } catch (error) {
      setOutputData({ error: error.message });
    }
  };

  return (
    <View
      inputFormat={inputFormat}
      setInputFormat={setInputFormat}
      inputData={inputData}
      setInputData={setInputData}
      solveProblem={solveProblem}
      outputData={outputData} // Pass the parsed result object to View
    />
  );
};

export default HighsSolver;
