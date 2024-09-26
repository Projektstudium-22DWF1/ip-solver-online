import React, { useState } from "react";
import "uikit/dist/css/uikit.min.css";
import FileButtons from "../FileButtons";
import OutputUi from "../OutputUi";
import {
  solve,
  InputOptions,
  SolverOptions,
} from "../../services/SolverInterface";

export function GmplProbleme() {
  const [problem, setProblem] = useState("");
  const [solverOption, setSolverOption] = useState(SolverOptions.HIGHS);
  const [outputData, setOutputData] = useState("");

  const solveProblem = async () => {
    const result = await solve(problem, InputOptions.GMPL, solverOption);
    setOutputData(result);
  };

  return (
    <React.Fragment>
      <div id={"dropdowns"}>
        <div className="uk-margin">
          {/********** Solver Box **********/}
          <div uk-form-custom="target: > * > span:first-child">
            <select
              aria-label="Custom controls"
              onChange={(e) => setSolverOption(e.target.value)}
            >
              <option value={SolverOptions.HIGHS}>HIGHS</option>
              <option value={SolverOptions.GLPK}>GLPK</option>
            </select>
            <button
              className="uk-button uk-button-default"
              type="button"
              tabIndex="-1"
            >
              <span></span>
              <span uk-icon="icon: chevron-down"></span>
            </button>
          </div>
        </div>
      </div>

      <div className={"main-container"}>
        <div id={"#problemContainer"}>
          {/********** Textarea **********/}
          <div>
            <label htmlFor="textareaInput">Eingabe</label>
            <textarea
              id="textareaInput"
              className="uk-textarea"
              rows="10"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>

      <button
        className="uk-button uk-button-secondary uk-button-large"
        onClick={solveProblem}
      >
        Solve problem
      </button>

      <FileButtons problem={problem} setProblem={setProblem} />
      <OutputUi outputData={outputData} />
    </React.Fragment>
  );
}
