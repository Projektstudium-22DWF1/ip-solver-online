import React from "react";
import "uikit/dist/css/uikit.min.css";
import "./../styles/navbar.css";

function Chooser({ options, onChange, label, value }) {
    return (
        <React.Fragment>
            <div id={"dropdowns"}>
                <div className="uk-margin">
                    {/********** Chooser Box **********/}
                    <div uk-form-custom="target: > * > span:first-child">
                        <select aria-label={label} onChange={(e) => onChange(e.target.value)}>
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
                            <span></span>
                            <span uk-icon="icon: chevron-down"></span>
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Chooser;
