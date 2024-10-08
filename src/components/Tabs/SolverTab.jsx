import React, { useState, useCallback  } from "react";
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
    // constraints, constraintNames, bounds, validProblem, validConstraint, validConstraintNames, validBound, setValidProblem, setValidConstraint, setValidConstraintNames, setValidBound
    const [solverOption, setSolverOption] = useState(SolverOptions.HIGHS);
    const [problem, setProblem] = useState("");

    const [inputFormat, setInputFormat] = useState(InputOptions.LP);
    const [textareaStyle, setTextareaStyle] = useState("Guided");

    const [outputData, setOutputData] = useState("");


    const [solverData, setSolverData] = useState([]);
    const handleDataFromChild = useCallback((data) => {
        // console.log("Daten von der Kindkomponente:", data);
        setSolverData(data);
    }, []);

  const solveProblem = async () => {
      console.log(problem);
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
          <GuidedTextarea problem={problem} setProblem={setProblem} solverData={solverData} setSolverData={handleDataFromChild}/>
        )}
        {textareaStyle === "Raw" && (
          <RawTextInput
            problem={problem}
            setProblem={setProblem}
          ></RawTextInput>
        )}
      </div>

        <SolveProblemButton solveProblem={()=> {

            // if (isTextareaVisible === true && validateGuidedProblem(problem, constraints, constraintNames, bounds, validProblem, validConstraint, validConstraintNames, validBound, setValidProblem, setValidConstraint, setValidConstraintNames, setValidBound)) {
            console.log(problem);

            // solveProblem();
            // } else if (isTextareaVisible === false && validateRawProblem()) {
            //   solveProblem();
            // }

            if (textareaStyle === "Guided" && validateGuidedProblem(solverData.prob, solverData.constraints, solverData.constraintNames, solverData.bounds, solverData.validProblem, solverData.validConstraint, solverData.validConstraintNames, solverData.validBound, solverData.setValidProblem, solverData.setValidConstraint, solverData.setValidConstraintNames, solverData.setValidBound)) {
            // console.log(solverData); //TODO Daten bereitstellen für Validierung und dann mit if prüfen
                solveProblem();
            } else if (textareaStyle === "Raw") {
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
