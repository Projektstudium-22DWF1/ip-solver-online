import "./App.css";
import React from "react";
import { SolveExamples } from "./components/SolveExamples";
import "uikit/dist/css/uikit.min.css";
import { InputUi } from "./components/Tabs/MainNavbar";

function App() {
  return (
    <div>
      {/*<h1 className="uk-heading-line"><span>Solver</span></h1>*/}
      {/* Verwende die UIkit `uk-select` Klasse für das Dropdown */}
      {/*<div className="uk-margin">*/}
      {/*  <label htmlFor="solver-select">Wähle einen Solver: </label>*/}
      {/*  <select */}
      {/*    id="solver-select"*/}
      {/*    className="uk-select uk-form-width-medium" */}
      {/*    onChange={handleSolverChange} */}
      {/*    value={solver}*/}
      {/*  >*/}
      {/*    <option value="highs">HiGHS Solver</option>*/}
      {/*    <option value="glpk">GLPK Solver</option>*/}
      {/*  </select>*/}
      {/*</div>*/}
      {/* Dynamisches Rendering der Solver-Komponenten */}
      {/*{solver === "highs" ? <HighsSolver /> : <GlpkSolver />}*/}
      <SolveExamples /> {/* Zeigt die Beispiele in der Konsole an */}
      <InputUi />
      {/* <OutputUI /> Hier muss die "OutputUi" von Ben gesetzt werden */}
      {/********** Footer **********/}
      <footer className="uk-section uk-section-small uk-text-center uk-background-muted">
        <div className="uk-container">
          <p>© Anwendung zur Lösung linearer Optimierungsprobleme</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
