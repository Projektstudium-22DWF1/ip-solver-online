import React, { useContext } from "react";
import "uikit/dist/css/uikit.min.css";
import "./../styles/styles.css";
import { LanguageContext } from "../../context/LanguageContext";

function RawTextarea({ problem, setProblem }) {
  const { translations } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <div>
        {/********** Textarea **********/}
        <div>
          <label
            htmlFor="textareaInput"
            style={{ marginTop: "20px", display: "block" }}
          >
            {translations.input}
          </label>{" "}
          <textarea
            id="textareaInput"
            data-testid="raw-textarea"
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
