import React, { useState } from "react";
import View from "./View";
import { solve, SolverOptions } from "./../services/SolverInterface";

const HighsSolver = () => {
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState(null);
  const [inputFormat, setInputFormat] = useState("GMPL");

  const solveProblem = async () => {
    try {
      var startTime = performance.now();
      const result = await solve(inputData, inputFormat, SolverOptions.HIGHS);
      var endTime = performance.now();
      result["Walltime"] = (endTime - startTime) / 1000;

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

export default HighsSolver;
