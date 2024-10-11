import React, { useState, useCallback } from "react";
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
  const [solverOption, setSolverOption] = useState(SolverOptions.HIGHS);
  const [problem, setProblem] = useState("");

  const [inputFormat, setInputFormat] = useState(InputOptions.LP);
  const [textareaStyle, setTextareaStyle] = useState("Guided");

  const [outputData, setOutputData] = useState("");
  const [errorData, setErrorData] = useState("");

  const [solverData, setSolverData] = useState([]);
  const handleDataFromChild = useCallback((data) => {
    setSolverData(data);
  }, []);

  const solveProblem = async () => {
    try {
      const result = await solve(problem, inputFormat, solverOption); // Solves the problem
      setOutputData(result); // Updates output data
    } catch (error) {
      setErrorData({ message: error.message, id: Date.now() }); // Handles error
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
        {/* Solver selector and input format chooser */}
        <SolverChooser
          solverOption={solverOption}
          setSolverOption={setSolverOption}
        />
        <InputFormatChooser
          inputFormat={inputFormat}
          setInputFormat={setInputFormat}
          textAreaStyle={textareaStyle}
          setProblem={setProblem}
        />
      </div>

      <div className={"main-container"}>
        {/* Input format information and style chooser */}
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
            setProblem={setProblem}
          />
          <InputFormatInformationIcon inputFormat={inputFormat} />
        </div>

        {/* Conditional rendering based on textarea style */}
        {textareaStyle === "Guided" && (
          <GuidedTextarea
            problem={problem}
            setProblem={setProblem}
            solverData={solverData}
            setSolverData={handleDataFromChild}
            setErrorData={setErrorData}
          />
        )}
        {textareaStyle === "Raw" && (
          <RawTextInput
            problem={problem}
            setProblem={setProblem}
          ></RawTextInput>
        )}
        <ErrorMessage errorData={errorData} setErrorData={setErrorData} />
      </div>

      {/* Solve problem button with validation for guided mode */}
      <SolveProblemButton
        solveProblem={solveProblem}
        setErrorData={setErrorData}
        solveControl={solverData.solveControl}
        textAreaStyle={textareaStyle}
      />

      {/* File buttons for problem management */}
      <FileButtons
        problem={problem}
        setProblem={setProblem}
        textAreaStyle={textareaStyle}
      />

      {/* Output UI rendering if output data is available */}
      {outputData && (
        <div
          style={{ textAlign: "center", marginTop: "20px" }}
          className={"main-container"}
        >
          <OutputUi outputData={outputData} />
        </div>
      )}
    </React.Fragment>
  );
}
