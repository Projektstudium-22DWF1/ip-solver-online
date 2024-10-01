import React from "react";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import "uikit/dist/css/uikit.min.css";

UIkit.use(Icons);

function Chooser({ options, onChange, label, value }) {
    const uniqueId = `chooser-${label.replace(/\s+/g, '-')}`; // Erstelle eine eindeutige ID für das Label
    return (
        <React.Fragment>
            <div id={"dropdowns"}>
                <div className="uk-margin">
                    {/********** Beschriftung (Label) **********/}
                    <label htmlFor={uniqueId} className="uk-form-label">
                        {label}:
                    </label>

                    {/********** Chooser Box **********/}
                    <div uk-form-custom="target: > * > span:first-child">
                        <select
                            id={uniqueId} // Verknüpft das Label mit dem Dropdown
                            aria-label={label}
                            onChange={(e) => onChange(e.target.value)}
                        >
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
