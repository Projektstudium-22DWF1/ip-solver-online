import React, { useState, useContext, useEffect } from "react";
import "uikit/dist/css/uikit.min.css";
import "./../styles/styles.css";
import OptimizationDirectionChooser from "../Choosers/OptimizationDirectionChooser";
import { LanguageContext } from "../../context/LanguageContext";
import {
  validateBound,
  validateConstraintNames,
  validateConstraints,
  validateProblem,
} from "../../services/Validation";
import { solve } from "../../services/SolverInterface";

function GuidedTextarea({ setProblem, setSolverData }) {
  const { translations } = useContext(LanguageContext);
  const [optimizationDirection, setOptimizationDirection] =
    useState("Maximize");

  const [prob, setProb] = useState([{ value: "" }]);
  const [constraints, setConstraints] = useState([{ value: "" }]);
  const [bounds, setBounds] = useState([{ value: "" }]);
  const [constraintNames, setConstraintNames] = useState([{ value: "" }]);
  const [validProblem, setValidProblem] = useState(
    Array(prob.length).fill(false),
  );
  const [validConstraint, setValidConstraint] = useState(
    Array(constraints.length).fill(false),
  );
  const [validBound, setValidBound] = useState(Array(bounds.length).fill(true));
  const [validConstraintNames, setValidConstraintNames] = useState(
    Array(constraintNames.length).fill(true),
  );
  const [solveControl, setSolveControl] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const dataToSend = { prob, setProb, solveControl, setSolveControl };
    setSolverData(dataToSend); // Updates parent with current solver data
  }, [prob, setProb, setSolverData, solveControl, setSolveControl]);

  useEffect(() => {
    returnProblem();
  }, [optimizationDirection, setOptimizationDirection, constraints, constraintNames, bounds, prob, validConstraint, setValidConstraint]);

  // Helper function to generate the complete problem text
  const returnProblem = () => {
    let problem =
      optimizationDirection +
      " obj: " +
      prob[0].value +
      " Subject To " +
      constraints
        .map((e, index) => {
          const name = constraintNames[index].value;
          return name ? name + ": " + e.value : e.value;
        })
        .join(" ") +
      " Bounds " +
      bounds.map((e) => e.value).join(" ") +
      " End";

    setProblem(problem);
  };

  // Add new constraint, bound, or name
  const addRestriction = (setRestriction, restriction) => {
    setRestriction([...restriction, { value: "" }]);
  };

  // Modify existing constraint, bound, or name
  const handleRestrictionChange = (index, e, restriction, setRestriction) => {
    const newRestriction = [...restriction];
    newRestriction[index].value = e.target.value;
    setRestriction(newRestriction);
  };

  // Delete a constraint, bound, or name
  const deleteRestriction = (index, restriction, setRestriction, validRestriction, setValidRestriction) => {
    if (restriction.length === 1) {
      alert(translations.oneConstraintRequired);
    } else {
      const newRestriction = restriction.filter((_, i) => i !== index);
      setRestriction(newRestriction);

      const newValidRestriction = validRestriction.filter((_, i) => i !== index);
      setValidRestriction(newValidRestriction);
      returnProblem();
    }
  };

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return; // Skip Validation
    }

    const allValid =
      validProblem.every(Boolean) &&
      validConstraint.every(Boolean)
      // validConstraintNames.every(Boolean) &&
      // validBound.every(Boolean);

    setSolveControl(!allValid);
  }, [validProblem, validConstraint, validBound]);

  return (
    <React.Fragment>
      {/* Optimization direction chooser */}
      <OptimizationDirectionChooser
        optimizationDirection={optimizationDirection}
        setOptimizationDirection={setOptimizationDirection}
        returnProblem={returnProblem}
      />

      <div>
        {/* Problem statement input */}
        <label htmlFor="#problem">{translations.problemStatement}</label>
        <table className="mainArea">
          <tbody>
            {prob.map((p, index) => (
              <tr key={index}>
                <td>
                  <input
                    placeholder={"x1 + 2 x2 + 4 x3 + x4"}
                    className="uk-input"
                    type="text"
                    style={{
                      borderColor:
                        validProblem[index] === false ? "#ff0000" : "#ccc",
                    }}
                    value={p.value}
                    onChange={(e) => {
                      // setProb(e.target.value);
                      handleRestrictionChange(index, e, prob, setProb);
                      validateProblem(prob, validProblem, setValidProblem);
                      returnProblem();
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Constraints input */}
        <label htmlFor="#constraints">{translations.constraints}</label>
        <table className="mainArea">
          <tbody>
            {constraints.map((constraint, index) => (
              <tr key={index}>
                <td className={"constraintName"}>
                  <input
                    placeholder={"Name"}
                    className={"uk-input"}
                    type="text"
                    style={{
                      borderColor:
                        validConstraintNames[index] === false
                          ? "#ff0000"
                          : "#ccc",
                    }}
                    value={constraintNames[index].value}
                    onChange={(e) => {
                      handleRestrictionChange(
                        index,
                        e,
                        constraintNames,
                        setConstraintNames,
                      );
                      validateConstraintNames(
                        constraintNames,
                        validConstraintNames,
                        setValidConstraintNames,
                      );
                      returnProblem();
                    }}
                  />
                </td>
                <td>
                  <input
                    placeholder={"-x1 + x2 + x3 + 10 x4 <= 20"}
                    className="uk-input"
                    type="text"
                    style={{
                      borderColor:
                        validConstraint[index] === false ? "#ff0000" : "#ccc",
                    }}
                    value={constraint.value}
                    onChange={(e) => {
                      handleRestrictionChange(
                        index,
                        e,
                        constraints,
                        setConstraints,
                      );
                      validateConstraints(
                        constraints,
                        validConstraint,
                        setValidConstraint,
                      );
                      returnProblem();
                    }}
                  />
                </td>
                <td>
                  <span
                    className="addButton"
                    uk-icon="plus"
                    value={constraint.value}
                    onClick={() => {
                      setConstraints((prevConstraints) => {
                        const newConstraints = [...prevConstraints, { value: "" }];
                        validateConstraints(newConstraints, validConstraint, setValidConstraint);
                        returnProblem();
                        return newConstraints;
                      });

                      setConstraintNames((prevNames) => {
                        return [...prevNames, { value: "" }];
                      });
                    }}

                  ></span>
                </td>
                <td>
                  <span
                      className="removeButton"
                      uk-icon="close"
                      onClick={() => {
                        deleteRestriction(index, constraints, setConstraints, validConstraint, setValidConstraint);
                        deleteRestriction(index, constraintNames, setConstraintNames, validConstraintNames, setValidConstraintNames);
                      }}
                  ></span>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Bounds input */}
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
                    style={{
                      borderColor:
                        validBound[index] === false ? "#ff0000" : "#ccc",
                    }}
                    value={bound.value}
                    onChange={(e) => {
                      handleRestrictionChange(index, e, bounds, setBounds);
                      validateBound(bounds, validBound, setValidBound);
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
