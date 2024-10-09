import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit";
import enFlag from "../../assets/flags/en.png";
import deFlag from "../../assets/flags/de.png";

const LanguageSelector = () => {
  const { changeLanguage, translations } = useContext(LanguageContext); // Access language context

  // Close dropdown after selecting language
  const closeDropdown = () => {
    const dropdown = UIkit.dropdown(".uk-dropdown");
    dropdown.hide();
  };

  // Change language and close dropdown
  const handleLanguageChange = (language) => {
    closeDropdown();
    changeLanguage(language);
  };

  return (
    <div className="uk-navbar-item">
      <div className="uk-margin-small-left">
        <button
          data-testid="language-selector-button"
          className="uk-button uk-button-default uk-flex uk-flex-middle"
          type="button"
        >
          <span uk-icon="world" className="uk-margin-small-right"></span>
          {translations.activeLanguage}
        </button>

        {/* Dropdown for language options */}
        <div uk-dropdown="mode: click">
          <ul className="uk-nav uk-dropdown-nav">
            <li>
              <a
                data-testid="language-option-en"
                onClick={() => handleLanguageChange("en")}
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
                onClick={() => handleLanguageChange("de")}
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
