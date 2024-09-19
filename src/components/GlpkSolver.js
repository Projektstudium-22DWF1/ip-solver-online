import React, { useState } from "react";
import View from "./View";
import { solve, SolverOptions } from "./../services/SolverInterface";


export const solveProblem1 = async (inputData, inputFormat) => {
  try {
    const startTime = performance.now();
    const result = await solve(inputData, inputFormat, SolverOptions.GLPK);
    const endTime = performance.now();
    result["Walltime"] = (endTime - startTime) / 1000;

    return result;
    // setOutputData(result);
  } catch (error) {
    // setOutputData({ error: error.message });
  }
};


const GlpkSolver = () => {
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState(null);
  const [inputFormat, setInputFormat] = useState('GMPL');

  const solveProblem = async () => {
    try {
      const startTime = performance.now();
      const result = await solve(inputData, inputFormat, SolverOptions.GLPK);
      const endTime = performance.now();
      result["Walltime"] = (endTime - startTime) / 1000;

      setOutputData(result);
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
      outputData={outputData}
    />
  );
};

export default GlpkSolver;
