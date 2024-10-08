import React, { useState } from "react";
import "uikit/dist/css/uikit.min.css";
import FileButtons from "../FileButtons";
import OutputUi from "../OutputUi";
import SolverChooser from "../Choosers/SolverChooser";
import SolveProblemButton from "../SolveProblemButton";
import RawTextInput from "../TextareaStyles/RawTextarea";
import GuidedTextarea from "../TextareaStyles/GuidedTextarea";
import InputFormatChooser from "../Choosers/InputFormatChooser";
import InputTextareaStyleChooser from "../Choosers/InputTextareaStyleChooser";
import {
  solve,
  InputOptions,
  SolverOptions,
} from "../../services/SolverInterface";
import InputFormatInformationIcon from "../InputFormatInformationIcon";
import ErrorMessage from "../ErrorMessage";

export function SolverTab() {
  const [problem, setProblem] = useState("");
  const [solverOption, setSolverOption] = useState(SolverOptions.HIGHS);
  const [inputFormat, setInputFormat] = useState(InputOptions.LP);
  const [textareaStyle, setTextareaStyle] = useState("Guided");

  const [outputData, setOutputData] = useState("");
  const [errorData, setErrorData] = useState("");

  const solveProblem = async () => {
    try {
      const result = await solve(problem, inputFormat, solverOption);
      setOutputData(result);
    } catch (error) {
      setErrorData({ message: error.message, id: Date.now() });
    }
  };

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <SolverChooser
          solverOption={solverOption}
          setSolverOption={setSolverOption}
        />
        <InputFormatChooser
          inputFormat={inputFormat}
          setInputFormat={setInputFormat}
          textAreaStyle={textareaStyle}
        />
      </div>

      <div className={"main-container"}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <InputTextareaStyleChooser
            textareaStyle={textareaStyle}
            setTextareaStyle={setTextareaStyle}
            inputFormat={inputFormat}
          />

          <InputFormatInformationIcon inputFormat={inputFormat} />
        </div>

        {textareaStyle === "Guided" && (
          <GuidedTextarea problem={problem} setProblem={setProblem} />
        )}
        {textareaStyle === "Raw" && (
          <RawTextInput
            problem={problem}
            setProblem={setProblem}
          ></RawTextInput>
        )}
        <ErrorMessage errorData={errorData} setErrorData={setErrorData} />
      </div>

      <SolveProblemButton solveProblem={solveProblem} />

      <FileButtons problem={problem} setProblem={setProblem} />

      {/* Only render OutputUi if there is outputData */}
      {outputData && (
        <div className={"main-container"}>
          <OutputUi outputData={outputData} />
        </div>
      )}
    </React.Fragment>
  );
}
