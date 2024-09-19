import React, {useState} from "react";
import 'uikit/dist/css/uikit.min.css';
import {solveProblem1} from "../GlpkSolver";

export function KomplexeProbleme() {

    const [problem, setProblem]                 = useState("");
    const [problemOption, setProblemOption]             = useState("maximize");
    const [solverOption, setSolverOption]               = useState("highs");

    const solveProblem = async () => {

        // const lpExample = `Maximize obj: x1 + 2 x2 + 4 x3 + x4 Subject To c1: - x1 + x2 + x3 + 10 x4 <= 20 c2: x1 - 4 x2 + x3 <= 30 c3: x2 - 0.5 x4 = 0 Bounds 0 <= x1 <= 40 2 <= x4 <= 3 End`;
        // const gmplExample = `var x1 >= 0, <= 40; var x2; var x3; var x4 >= 2, <= 3; maximize obj: x1 + 2*x2 + 4*x3 + x4; s.t. c1: -x1 + x2 + x3 + 10*x4 <= 20; s.t. c2: x1 - 4*x2 + x3 <= 30; s.t. c3: x2 - 0.5*x4 = 0; end;`;

        const json = await solveProblem1(problem, "GMPL");
        console.log(json);

    }


    return (
        <React.Fragment>

            <div id={"dropdowns"}>
                <div className="uk-margin">

                    {/********** Maximize/Minimize Box **********/}
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
                    {/********** Solver Box **********/}
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
                </div>
            </div>

            <div className={"tables-container"}>

                <div id={"#problemContainer"}>

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

            <button className="uk-button uk-button-secondary uk-button-large" onClick={solveProblem}>Solve problem
            </button>

        </React.Fragment>
    );
}