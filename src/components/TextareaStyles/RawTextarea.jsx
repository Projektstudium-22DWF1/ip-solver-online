import React, { useContext } from "react";
import "uikit/dist/css/uikit.min.css";
import "./../styles/navbar.css";
import { LanguageContext } from "../../context/LanguageContext"; // Importiere den Kontext

function RawTextarea({ problem, setProblem }) {
  const { translations } = useContext(LanguageContext); // Zugriff auf Übersetzungen

  return (
    <React.Fragment>
      <div>
        {/********** Textarea **********/}
        <div>
          <label htmlFor="textareaInput">{translations.input}</label> {/* Verwende Übersetzung */}
          <textarea
            id="textareaInput"
            className="uk-textarea"
            rows="18"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          ></textarea>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RawTextarea;
