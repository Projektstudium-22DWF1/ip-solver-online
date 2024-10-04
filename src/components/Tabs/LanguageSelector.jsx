import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import "uikit/dist/css/uikit.min.css";

const LanguageSelector = () => {
  const { changeLanguage, translations } = useContext(LanguageContext); // Access the language context

  return (
    <div className="uk-navbar-item">
      <div className="uk-margin-small-left">
        {/* Button with the world icon */}
        <button className="uk-button uk-button-default uk-flex uk-flex-middle" type="button">
          <span uk-icon="world" className="uk-margin-small-right"></span>
          {translations.activeLanguage}
        </button>
        {/* Dropdown menu */}
        <div uk-dropdown="mode: click">
          <ul className="uk-nav uk-dropdown-nav">
            <li>
              <a onClick={() => changeLanguage("en")}>
                <span className="uk-margin-small-right" uk-icon="icon: flag"></span> English
              </a>
            </li>
            <li>
              <a onClick={() => changeLanguage("de")}>
                <span className="uk-margin-small-right" uk-icon="icon: flag"></span> Deutsch
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
