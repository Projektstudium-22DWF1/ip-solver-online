import React, { useState } from "react";
import "uikit/dist/css/uikit.min.css";
import FileButtons from "../FileButtons";
import OutputUi from "../OutputUi";
import SolverChooser from "../Choosers/SolverChooser";
import SolveProblemButton from "../SolveProblemButton";
import RawTextInput from "../TextareaStyles/RawTextarea";
import GuidedTextarea from "../TextareaStyles/GuidedTextarea";
import InputFormatChooser from "../Choosers/InputFormatChooser";
import { validateGuidedProblem } from "../../services/Validation";
import InputTextareaStyleChooser from "../Choosers/InputTextareaStyleChooser";
import {
  solve,
  InputOptions,
  SolverOptions,
} from "../../services/SolverInterface";
import InputFormatInformationIcon from "../InputFormatInformationIcon";

export function SolverTab() {
    const [solverOption, setSolverOption] = useState(SolverOptions.HIGHS);

    const [constraints, setConstraints] = useState([{ value: "" }]);
    const [bounds, setBounds] = useState([{ value: "" }]);
    const [constraintNames, setConstraintNames] = useState([{ value: "" }]);
    const [problem, setProblem] = useState("");

    const [validProblem, setValidProblem] = useState(true);
    const [validConstraint, setValidConstraint] = useState(
        Array(constraintNames.length).fill(true)
    );
    const [validBound, setValidBound] = useState(
        Array(constraintNames.length).fill(true)
    );
    const [validConstraintNames, setValidConstraintNames] = useState(
        Array(constraintNames.length).fill(true) // Initialisiere mit true für jedes Feld
    );


    const [inputFormat, setInputFormat] = useState(InputOptions.LP);
    const [textareaStyle, setTextareaStyle] = useState("Guided");

    const [outputData, setOutputData] = useState("");

  const solveProblem = async () => {
    const result = await solve(problem, inputFormat, solverOption);
    setOutputData(result);
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
      </div>

        <SolveProblemButton solveProblem={()=> {
            if (validateGuidedProblem(problem, constraints, constraintNames, bounds, validProblem, validConstraint, validConstraintNames, validBound, setValidProblem, setValidConstraint, setValidConstraintNames, setValidBound)) {
                solveProblem();
            }
        }
        } />

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
