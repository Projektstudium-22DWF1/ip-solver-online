import React, { useState } from "react";
// import 'uikit/dist/css/uikit.min.css';
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import "./styles/navbar.css";
import {
  solve,
  SolverOptions,
  InputOptions,
} from "../../services/SolverInterface";
import FileButtons from "../FileButtons";
import OutputUi from "../OutputUi";

UIkit.use(Icons);

export function LpProbleme() {
  const [problemOption, setProblemOption] = useState("maximize");
  const [solverOption, setSolverOption] = useState(SolverOptions.HIGHS);
  const [isTextareaVisible, setIsTextareaVisible] = useState(true);

  const [constraints, setConstraints] = useState([{ value: "" }]);
  const [bounds, setBounds] = useState([{ value: "" }]);
  const [problem, setProblem] = useState("");
  const [outputData, setOutputData] = useState("");

  /********** Togglet immer wieder den Zustand von isTextareaVisible **********/
  const toggleTextarea = () => {
    setIsTextareaVisible(!isTextareaVisible);
  };

  /********** Funktion zum Hinzufügen einer neuen Zeile in mainArea **********/
  const addRestriction = (setRestriction, restriction) => {
    setRestriction([...restriction, { value: "" }]); // Kopiere aktuellen Inhalt von constraints und füge Objekt hinten dran.
  };

  /********** Funktion zum Ändern einer Restriction **********/
  const handleRestrictionChange = (index, e, restriction, setRestriction) => {
    const newRestriction = [...restriction]; // Kopie aktueller constraints
    newRestriction[index].value = e.target.value; // value auf Eingabe setzen
    setRestriction(newRestriction); // alte durch neue Constraints ersetzen
  };

  /********** Funktion zum Löschen einer Restriction **********/
  const deleteRestriction = (index, restriction, setRestriction) => {
    if (restriction.length === 1) {
      alert("One constraint required"); //TODO alert mit UiKit umsetzen
    } else {
      const newRestriction = restriction.filter((currElm, i) => i !== index); // currElm = aktuelles Element, i = index
      // i !== index -> index ist der index des Elements, auf was geklickt wurde
      setRestriction(newRestriction);
    }
  };

  const solveProblem = async () => {
    //TODO Datenvalidierung muss als erstes gemacht werden bei Aufruf der Funktion
    let lpProblem;
    if (!isTextareaVisible) {
      lpProblem = problem; //TODO Wenn man Daten in geführte Function einfügt, sollen sie NICHT in Textarea eingefügt werden
    } else {
      lpProblem = `${problemOption} obj: 
${problem}
Subject To 
${constraints.map((e, index) => `c${index + 1}: ${e.value}`).join("\n")} 
Bounds 
${bounds.map((e) => e.value).join("\n")} 
End`;
      //TODO c${index +1} muss angepasst werden, sodass Name im Frontend entgegen genommen wird. Über Validierung -> Keine gleichen Namen
    }

    const result = await solve(lpProblem, InputOptions.LP, solverOption);
    setOutputData(result);
  };

  return (
    <React.Fragment>
      <div id={"dropdowns"}>
        <div className="uk-margin">
          {/********** Maximize/Minimize Dropdown **********/}
          <div uk-form-custom="target: > * > span:first-child">
            <select
              aria-label="Custom controls"
              onChange={(e) => setProblemOption(e.target.value)}
            >
              <option value="maximize">Maximize</option>
              <option value="minimize">Minimize</option>
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
          {/********** Solverauswahl Dropdown **********/}
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
        {/********** Togglebutton **********/}
        <button
          onClick={toggleTextarea}
          className="uk-button uk-button-secondary uk-button-small"
        >
          {isTextareaVisible ? "Wechsle zu Textarea" : "Wechsle zu Formular"}
        </button>

        <div id={"#problemContainer"}>
          {isTextareaVisible ? (
            <div>
              {/********** Function **********/}
              <label htmlFor="#problem">Function</label>
              <table className="mainArea">
                <tbody>
                  <tr>
                    <td>
                      <input
                        placeholder={"x1 + 2 x2 + 4 x3 + x4"}
                        className="uk-input"
                        type="text"
                        onChange={(e) => setProblem(e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              {/********** Constraints **********/}
              <label htmlFor="#constraints">Constraints</label>
              <table className="mainArea">
                <tbody>
                  {constraints.map((constraint, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          placeholder={"-x1 + x2 + x3 + 10 x4 <= 20"}
                          className="uk-input"
                          type="text"
                          value={constraint.value}
                          onChange={(e) =>
                            handleRestrictionChange(
                              index,
                              e,
                              constraints,
                              setConstraints,
                            )
                          }
                        />
                      </td>
                      <td>
                        <span
                          className="addButton"
                          uk-icon="plus"
                          onClick={() => {
                            addRestriction(setConstraints, constraints);
                          }}
                        ></span>
                      </td>
                      <td>
                        <span
                          className="removeButton"
                          uk-icon="close"
                          onClick={(e) => {
                            deleteRestriction(
                              index,
                              constraints,
                              setConstraints,
                            );
                          }}
                        ></span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/********** Bounds **********/}
              <label htmlFor="#bounds">Bounds</label>
              <table className={"mainArea"}>
                <tbody>
                  {bounds.map((bound, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          placeholder={"0 <= x1 <= 40"}
                          className="uk-input"
                          type="text"
                          value={bound.value}
                          onChange={(e) =>
                            handleRestrictionChange(index, e, bounds, setBounds)
                          }
                        />
                      </td>
                      <td>
                        <span
                          className="addButton"
                          uk-icon="plus"
                          onClick={() => {
                            addRestriction(setBounds, bounds);
                          }}
                        ></span>
                      </td>
                      <td>
                        <span
                          className="removeButton"
                          uk-icon="close"
                          onClick={(e) => {
                            deleteRestriction(index, bounds, setBounds);
                          }}
                        ></span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              {/********** Textarea for raw problem **********/}
              <label htmlFor="textareaInput">Eingabe</label>
              <textarea
                id="textareaInput"
                className="uk-textarea"
                rows="10"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
              ></textarea>
            </div>
          )}
        </div>
      </div>
      {/********** Solve-problem-button **********/}
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
