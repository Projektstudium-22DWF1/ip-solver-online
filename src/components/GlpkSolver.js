import React, { useState } from "react";
import View from "./View";
import { solve, SolverOptions } from "./../services/SolverInterface";

const GlpkSolver = () => {
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState(null);
  const [inputFormat, setInputFormat] = useState('GMPL');

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
