import React, { useState } from "react";
import "uikit/dist/css/uikit.min.css";
import FileButtons from "../FileButtons";
import OutputUi from "../OutputUi";
import SolverChooser from "../Choosers/SolverChooser";
import SolveProblemButton from "../SolveProblemButton";
import RawTextInput from "../TextareaStyles/RawTextarea"
import GuidedTextarea from "../TextareaStyles/GuidedTextarea"
import InputFormatChooser from "../Choosers/InputFormatChooser"
import InputTextareaStyleChooser from "../Choosers/InputTextareaStyleChooser"
import {
  solve,
  InputOptions,
  SolverOptions,
} from "../../services/SolverInterface";


export function SolverTab() {
  const [problem, setProblem] = useState("");
  const [solverOption, setSolverOption] = useState(SolverOptions.HIGHS);
  const [inputFormat, setInputFormat] = useState(InputOptions.GMPL);
  const [textareaStyle, setTextareaStyle] = useState("Guided");

  const [outputData, setOutputData] = useState("");


  
  const solveProblem = async () => {
    const result = await solve(problem, inputFormat, solverOption);
    setOutputData(result);
  };

  return (
    <React.Fragment>
      <SolverChooser setSolverOption={setSolverOption}></SolverChooser>

      <InputFormatChooser inputFormat={inputFormat} setInputFormat={setInputFormat} textAreaStyle={textareaStyle} ></InputFormatChooser>

      <InputTextareaStyleChooser setTextareaStyle={setTextareaStyle} />


      <div>
        {textareaStyle === "Guided" && (
          <GuidedTextarea problem={problem} setProblem={setProblem} />

        )}
        {textareaStyle === "Raw" && (
          <RawTextInput problem={problem} setProblem={setProblem}></RawTextInput>
        )}
      </div>

      <SolveProblemButton solveProblem={solveProblem} />

      <FileButtons problem={problem} setProblem={setProblem} />

      <OutputUi outputData={outputData} />
    </React.Fragment>
  );
}