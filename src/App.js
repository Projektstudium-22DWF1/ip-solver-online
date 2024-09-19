import "./App.css";
import React, { useState } from "react";
import HighsSolver from "./components/HighsSolver";
import GlpkSolver from "./components/GlpkSolver";
import { SolveExamples } from "./components/SolveExamples";
import 'uikit/dist/css/uikit.min.css';
import {InputUi} from "./components/InputUi/InputUi";

function App() {
    // Zustand für die Auswahl der Komponente
    const [solver, setSolver] = useState("highs");

    // Funktion zum Ändern der ausgewählten Komponente
    const handleSolverChange = (event) => {
        setSolver(event.target.value);
    };

    return (
        <div className="App uk-container uk-margin-top" style={{ borderStyle: "solid", padding: "20px" }}>
            <h1 className="uk-heading-line"><span>Solver</span></h1>

            {/* Verwende die UIkit `uk-select` Klasse für das Dropdown */}
            <div className="uk-margin">
                <label htmlFor="solver-select">Wähle einen Solver: </label>
                <select
                    id="solver-select"
                    className="uk-select uk-form-width-medium"
                    onChange={handleSolverChange}
                    value={solver}
                >
                    <option value="highs">HiGHS Solver</option>
                    <option value="glpk">GLPK Solver</option>
                </select>
            </div>

            {/* Dynamisches Rendering der Solver-Komponenten */}
            {solver === "highs" ? <HighsSolver /> : <GlpkSolver />}

            <SolveExamples /> {/* Zeigt die Beispiele in der Konsole an */}
        </div>
    );
}

export default App;