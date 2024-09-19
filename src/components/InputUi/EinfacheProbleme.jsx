import React, { useEffect, useState, useRef } from "react";
// import 'uikit/dist/css/uikit.min.css';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import "./styles/navbar.css";
import "../HighsSolver";
// import { solveProblem as highsSolveProblem } from "../HighsSolver";


// Initialisiere UIkit mit Icons
UIkit.use(Icons);

export function EinfacheProbleme() {

    const [problemOption, setProblemOption] = useState("maximize");
    const [solverOption, setSolverOption] = useState("highs");
    const [formatOption, setFormatOption] = useState("GMPL");

    const [constraints, setConstraints] = useState([{ value: "" }]);
    const [bounds, setBounds]           = useState([{ value: "" }]);
    const [problem, setProblem]           = useState("");

    // Funktion zum Hinzufügen einer neuen Zeile in mainArea
    const handleClick = (setCondition, condition) => {
        setCondition([...condition, {value: ""}]); // Kopiere aktuellen Inhalt von constraints und füge Objekt hinten dran.
    };


    // Funktion zum Ändern einer Constraint
    const handleconditionChange = (index, e, condition, setcondition) => {
        const newcondition = [...condition]; // Kopie aktueller constraints
        newcondition[index].value = e.target.value;   // value auf Eingabe setzen
        setcondition(newcondition);                 // alte durch neue Constraints ersetzen
    };

    const deleteConstraint = (index, condition, setcondition) => {
        if (condition.length === 1) {
            alert("One constraint required");
        } else {
            const newcondition = condition.filter((currElm, i) => i !== index); // currElm = aktuelles Element, i = index
            // i !== index -> index ist der index des Elements, auf was geklickt wurde
            setcondition(newcondition);
        }
    }
    

    const solveProblem = async () => {
        //TODO und anschließend muss in Abhängigkeit der Parameter das entsprechende Format gebaut werden (Template String)
        //TODO Dieses Format wird dann an die entsprechende Funktion mit entsprechenden Parametern weitergeleitet (HIGHS oder GLPK)
        //TODO Datenvalidierung muss als erstes gemacht werden bei Aufruf der Funktion

        // const lp = `Maximize obj: ${problem} Subject To ${constraints.map((e, index) => `c${index + 1}: ` + e.value).join(' ') } Bounds ${bounds.map(e => e.value).join(' ')} End`;
        const lpExample = `Maximize obj: x1 + 2 x2 + 4 x3 + x4 Subject To c1: - x1 + x2 + x3 + 10 x4 <= 20 c2: x1 - 4 x2 + x3 <= 30 c3: x2 - 0.5 x4 = 0 Bounds 0 <= x1 <= 40 2 <= x4 <= 3 End`;
        const gmplExample = `var x1 >= 0, <= 40; var x2; var x3; var x4 >= 2, <= 3; maximize obj: x1 + 2*x2 + 4*x3 + x4; s.t. c1: -x1 + x2 + x3 + 10*x4 <= 20; s.t. c2: x1 - 4*x2 + x3 <= 30; s.t. c3: x2 - 0.5*x4 = 0; end;`;
        // console.log(await highsSolveProblem(gmplExample, formatOption)); // Lösen über HIGHS -> Wird in HighsSolver.js konvertiert
        // console.log(problem);

        // console.log(rs);

    }

    return (
        <React.Fragment>
                <div id={"dropdowns"}>
                    <div className="uk-margin">
                        {/* Maximize/Minimize Box */}
                        <div uk-form-custom="target: > * > span:first-child">
                            <select aria-label="Custom controls" onChange={(e) => setProblemOption(e.target.value)}>
                                <option value="maximize">Maximize</option>
                                <option value="minimize">Minimize</option>
                            </select>
                            <button className="uk-button uk-button-default" type="button" tabIndex="-1">
                                <span></span>
                                <span uk-icon="icon: chevron-down"></span>
                            </button>
                        </div>
                        {/* Solver Box */}
                        <div uk-form-custom="target: > * > span:first-child">
                            <select aria-label="Custom controls" onChange={(e) => setSolverOption(e.target.value)}>
                                <option value="highs">HIGHS</option>
                                <option value="glpk">GLPK</option>
                            </select>
                            <button className="uk-button uk-button-default" type="button" tabIndex="-1">
                                <span></span>
                                <span uk-icon="icon: chevron-down"></span>
                            </button>
                        </div>
                        {/* Format Box */}
                        <div uk-form-custom="target: > * > span:first-child">
                            <select aria-label="Custom controls" onChange={(e) => setFormatOption(e.target.value)}>
                                <option value="GMPL">GMPL</option>
                                <option value="LP">LP</option>
                            </select>
                            <button className="uk-button uk-button-default" type="button" tabIndex="-1">
                                <span></span>
                                <span uk-icon="icon: chevron-down"></span>
                            </button>
                        </div>
                    </div>
                </div>

            <div className={"tables-container"}>

                <label htmlFor="#problem">Function</label>
                <table className="mainArea">
                    <tbody>
                        <tr>
                            <td><input placeholder={"x1 + 2 x2 + 4 x3 + x4"} className="uk-input" type="text" onChange={(e) => setProblem(e.target.value)} /></td>
                        </tr>
                    </tbody>
                </table>


                <label htmlFor="#constraints">Constraints</label>
                <table className="mainArea">
                    <tbody>
                    {constraints.map((constraint, index) => (
                        <tr key={index}>
                            <td><input placeholder={"-x1 + x2 + x3 + 10 x4 <= 20"} className="uk-input" type="text" value={constraint.value}
                                       onChange={(e) => handleconditionChange(index, e, constraints, setConstraints)}/>
                            </td>
                            <td><span className="addButton" uk-icon="plus" onClick={() => {
                                handleClick(setConstraints, constraints)
                            }}></span></td>
                            <td><span className="removeButton" uk-icon="close" onClick={(e) => {
                                deleteConstraint(index, constraints, setConstraints)
                            }}></span></td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <label htmlFor="#bounds">Bounds</label>
                <table className={"mainArea"}>
                    <tbody>
                    {bounds.map((bound, index) => (
                        <tr key={index}>
                            <td><input placeholder={"0 <= x1 <= 40"} className="uk-input" type="text" value={bound.value}
                                       onChange={(e) => handleconditionChange(index, e, bounds, setBounds)}/></td>
                            <td><span className="addButton" uk-icon="plus" onClick={() => {
                                handleClick(setBounds, bounds)
                            }}></span></td>
                            <td><span className="removeButton" uk-icon="close" onClick={(e) => {
                                deleteConstraint(index, bounds, setBounds)
                            }}></span></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <button className="uk-button uk-button-secondary uk-button-large" onClick={solveProblem}>Solve problem
            </button>

        </React.Fragment>
    );
}