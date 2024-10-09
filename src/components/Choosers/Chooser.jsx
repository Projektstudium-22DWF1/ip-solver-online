import React from "react";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import "uikit/dist/css/uikit.min.css";

UIkit.use(Icons);

function Chooser({ options, onChange, label, value }) {
  // Create a unique ID for the label based on the provided label text
  const uniqueId = `chooser-${label.replace(/\s+/g, "-")}`; 

  return (
    <React.Fragment>
      <div id={"dropdowns"}>
        <div className="uk-margin">
          {/********** Label for the dropdown **********/}
          <label htmlFor={uniqueId} className="uk-form-label">
            {label}:
          </label>

          {/********** Dropdown Chooser Box **********/}
          <div uk-form-custom="target: > * > span:first-child">
            <select
              id={uniqueId} 
              aria-label={label} 
              onChange={(e) => onChange(e.target.value)} 
            >
              {/* Maps over the options and creates each option element */}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button
              className="uk-button uk-button-default"
              type="button"
              tabIndex="-1" 
            >
              <span>{value}</span>
              <span uk-icon="icon: chevron-down"></span>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Chooser;
