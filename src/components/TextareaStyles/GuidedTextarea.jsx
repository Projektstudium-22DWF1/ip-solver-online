import React, { useState, useContext } from "react";
import "uikit/dist/css/uikit.min.css";
import "./../styles/styles.css";
import OptimizationDirectionChooser from "../Choosers/OptimizationDirectionChooser";
import { LanguageContext } from "../../context/LanguageContext"; // Importiere den Kontext

function GuidedTextarea({ setProblem }) {
  const { translations } = useContext(LanguageContext); // Zugriff auf Übersetzungen
  const [optimizationDirection, setOptimizationDirection] =
    useState("Maximize");
  const [constraints, setConstraints] = useState([{ value: "" }]);
  const [bounds, setBounds] = useState([{ value: "" }]);
  const [problemStatement, setProblemStatement] = useState("");

  /********** Funktion zum Hinzufügen einer neuen Zeile in mainArea **********/
  const addRestriction = (setRestriction, restriction) => {
    setRestriction([...restriction, { value: "" }]);
  };

  /********** Funktion zum Ändern einer Restriction **********/
  const handleRestrictionChange = (index, e, restriction, setRestriction) => {
    const newRestriction = [...restriction];
    newRestriction[index].value = e.target.value;
    setRestriction(newRestriction);
  };

  /********** Funktion zum Löschen einer Restriction **********/
  const deleteRestriction = (index, restriction, setRestriction) => {
    if (restriction.length === 1) {
      alert(translations.oneConstraintRequired); // Verwende Übersetzung
    } else {
      const newRestriction = restriction.filter((_, i) => i !== index);
      setRestriction(newRestriction);
    }
  };

  const returnProblem = () => {
    let problem = `${optimizationDirection} obj: 
            ${problemStatement}
            Subject To 
            ${constraints.map((e) => e.value).join("\n    ")} 
            Bounds 
            ${bounds.map((e) => e.value).join("\n    ")} 
            End`;
    setProblem(problem);
  };

  return (
    <React.Fragment>
      <OptimizationDirectionChooser
        optimizationDirection={optimizationDirection}
        setOptimizationDirection={setOptimizationDirection}
      />

      <div>
        {/********** Problem Statement **********/}
        <label htmlFor="#problem">{translations.problemStatement}</label>
        <table className="mainArea">
          <tbody>
            <tr>
              <td>
                <input
                  placeholder={"x1 + 2 x2 + 4 x3 + x4"}
                  className="uk-input"
                  type="text"
                  onChange={(e) => {
                    setProblemStatement(e.target.value);
                    returnProblem();
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/********** Constraints **********/}
        <label htmlFor="#constraints">{translations.constraints}</label>
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
                    onChange={(e) => {
                      handleRestrictionChange(
                        index,
                        e,
                        constraints,
                        setConstraints,
                      );
                      returnProblem();
                    }}
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
                    onClick={() => {
                      deleteRestriction(index, constraints, setConstraints);
                      returnProblem();
                    }}
                  ></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/********** Bounds **********/}
        <label htmlFor="#bounds">{translations.bounds}</label>
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
                    onChange={(e) => {
                      handleRestrictionChange(index, e, bounds, setBounds);
                      returnProblem();
                    }}
                  />
                </td>
                <td>
                  <span
                    className="addButton"
                    uk-icon="plus"
                    onClick={() => {
                      addRestriction(setBounds, bounds);
                      returnProblem();
                    }}
                  ></span>
                </td>
                <td>
                  <span
                    className="removeButton"
                    uk-icon="close"
                    onClick={() => {
                      deleteRestriction(index, bounds, setBounds);
                      returnProblem();
                    }}
                  ></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default GuidedTextarea;
