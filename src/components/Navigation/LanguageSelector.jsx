import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import "uikit/dist/css/uikit.min.css";
import enFlag from "../../assets/flags/en.png"; // Importiere die englische Flagge
import deFlag from "../../assets/flags/de.png"; // Importiere die deutsche Flagge

const LanguageSelector = () => {
  const { changeLanguage, translations } = useContext(LanguageContext); // Zugriff auf den Sprachkontext

  return (
    <div className="uk-navbar-item">
      <div className="uk-margin-small-left">
        {/* Button mit Welt-Icon */}
        <button className="uk-button uk-button-default uk-flex uk-flex-middle" type="button">
          <span uk-icon="world" className="uk-margin-small-right"></span>
          {translations.activeLanguage}
        </button>
        {/* Dropdown-Menü */}
        <div uk-dropdown="mode: click">
          <ul className="uk-nav uk-dropdown-nav">
            <li>
              <a onClick={() => changeLanguage("en")}>
                <img src={enFlag} alt="English" className="uk-margin-small-right" style={{ width: "20px" }} />
                English
              </a>
            </li>
            <li>
              <a onClick={() => changeLanguage("de")}>
                <img src={deFlag} alt="Deutsch" className="uk-margin-small-right" style={{ width: "20px" }} />
                Deutsch
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
