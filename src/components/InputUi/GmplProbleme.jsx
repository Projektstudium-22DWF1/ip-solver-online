import React, { useState } from "react";
import "uikit/dist/css/uikit.min.css";
import { solveGlpkProblem } from "../GlpkSolver";
import { solveHighsProblem } from "../HighsSolver";

export function GmplProbleme() {
  const [problem, setProblem] = useState("");
  const [solverOption, setSolverOption] = useState("HIGHS");

  const solveProblem = async () => {
    {
      /********** Hier wird entschieden, welcher Solver für die Lösung des LP-Problems verwendet wird **********/
    }
    if (solverOption === "HIGHS") {
      const json = await solveHighsProblem(problem, "GMPL", solverOption);
      console.log(json);
    } else if (solverOption === "GLPK") {
      const json = await solveGlpkProblem(problem, "GMPL", solverOption);
      console.log(json);
    }
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
              <option value="HIGHS">HIGHS</option>
              <option value="GLPK">GLPK</option>
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
    </React.Fragment>
  );
}
