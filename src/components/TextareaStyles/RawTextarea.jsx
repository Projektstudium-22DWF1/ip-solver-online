import React from "react";
import "uikit/dist/css/uikit.min.css";
import "./../styles/navbar.css";

function RawTextarea({problem, setProblem}) {

    return (
        <React.Fragment>
        <div>
          {/********** Textarea **********/}
          <div>
            <label htmlFor="textareaInput">Input</label>
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
    )
}

export default RawTextarea;