import React, { useContext } from "react";
import "uikit/dist/css/uikit.min.css";
import "./../styles/styles.css";
import { LanguageContext } from "../../context/LanguageContext"; // Importiere den Kontext

function RawTextarea({ problem, setProblem }) {
  const { translations } = useContext(LanguageContext); // Zugriff auf Übersetzungen

  return (
    <React.Fragment>
      <div>
        {/********** Textarea **********/}
        <div>
          <label
            htmlFor="textareaInput"
            style={{ marginTop: "20px", display: "block" }} // Inline-Stil für Abstand
          >
            {translations.input}
          </label>{" "}
          {/* Verwende Übersetzung */}
          <textarea
            id="textareaInput"
            data-testid="raw-textarea" // Hinzufügen eines data-testid-Attributs
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
