import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import "uikit/dist/css/uikit.min.css";

const LanguageSelector = () => {
  const { changeLanguage, translations } = useContext(LanguageContext); // Zugriff auf den Sprachkontext

  return (
    <div className="uk-navbar-item">
      <span uk-icon="world"></span>
      <div className="uk-margin-small-left">
        <button className="uk-button uk-button-default" type="button">
          {translations.activeLanguage}
        </button>
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
