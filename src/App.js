import "./App.css";
import React from "react";
import  {SolveExamples}  from "./components/Tabs/SolveExamples";
import "uikit/dist/css/uikit.min.css";
import { MainNavbar } from "./components/Tabs/MainNavbar";

function App() {
  return (
    <div className={"all"}>
     
      <MainNavbar /> 
      {/* Zeigt die Beispiele in der Konsole an */}
      {/********** Footer **********/}
      <footer className="uk-section uk-section-small uk-text-center uk-background-muted">
        <div className="uk-container">
          <p>© Anwendung zur Lösung linearer Optimierungsprobleme</p>
        </div>
      </footer>
      <SolveExamples/>
    </div>
  );
}

export default App;
