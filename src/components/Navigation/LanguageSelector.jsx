import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit"; // UIkit importieren, um Dropdown manuell zu schließen
import enFlag from "../../assets/flags/en.png"; // Importiere die englische Flagge
import deFlag from "../../assets/flags/de.png"; // Importiere die deutsche Flagge

const LanguageSelector = () => {
  const { changeLanguage, translations } = useContext(LanguageContext); // Zugriff auf den Sprachkontext

  // Funktion zum Schließen des Dropdowns
  const closeDropdown = () => {
    const dropdown = UIkit.dropdown(".uk-dropdown"); // Selektiert das Dropdown
    dropdown.hide(); // Schließt das Dropdown
  };

  const handleLanguageChange = (language) => {
    closeDropdown(); // Schließe das Dropdown sofort
    changeLanguage(language); // Wechsel der Sprache nach Schließen des Dropdowns
  };

  return (
    <div className="uk-navbar-item">
      <div className="uk-margin-small-left">
        {/* Button mit Welt-Icon */}
        <button
          data-testid="language-selector-button" // Hinzugefügt
          className="uk-button uk-button-default uk-flex uk-flex-middle"
          type="button"
        >
          <span uk-icon="world" className="uk-margin-small-right"></span>
          {translations.activeLanguage}
        </button>
        {/* Dropdown-Menü */}
        <div uk-dropdown="mode: click">
          <ul className="uk-nav uk-dropdown-nav">
            <li>
              <a
                data-testid="language-option-en"
                onClick={() => handleLanguageChange("en")} // Schließt Dropdown sofort und wechselt Sprache
              >
                <img
                  src={enFlag}
                  alt="English"
                  className="uk-margin-small-right"
                  style={{ width: "20px" }}
                />
                English
              </a>
            </li>
            <li>
              <a
                data-testid="language-option-de"
                onClick={() => handleLanguageChange("de")} // Schließt Dropdown sofort und wechselt Sprache
              >
                <img
                  src={deFlag}
                  alt="Deutsch"
                  className="uk-margin-small-right"
                  style={{ width: "20px" }}
                />
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
