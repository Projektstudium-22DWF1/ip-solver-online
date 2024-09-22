import React, { useState } from "react";
import View from "./View";
import { solve, SolverOptions } from "../services/SolverInterface";

export const solveGlpkProblem = async (inputData, inputFormat, solver) => {
  try {
    console.log("SOLVER: " + solver);
    const startTime = performance.now();
    const result = await solve(inputData, inputFormat, SolverOptions[solver]);

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
  const [inputFormat, setInputFormat] = useState("GMPL");

  const solveProblem = async () => {
    const startTime = performance.now();
    const result = await solve(inputData, inputFormat, SolverOptions.GLPK);
    const endTime = performance.now();
    result["Walltime"] = (endTime - startTime) / 1000;

    setOutputData(result);
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
