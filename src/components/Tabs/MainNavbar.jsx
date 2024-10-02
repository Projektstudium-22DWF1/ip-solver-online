import React, { useContext, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import "uikit/dist/css/uikit.min.css";
import { SolverTab } from "./SolverTab";
import DescriptionTab from "./DescriptionTab";

export function MainNavbar() {
  const [activeComponent, setActiveComponent] = useState("SolverTab");
  const { changeLanguage, translations } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <div>
        {/* Navigationsleiste */}
        <nav className="uk-navbar-container" uk-navbar={"true"}>
          <div className="uk-navbar-left">
            <ul className="uk-navbar-nav">
              <li
                className={`uk-active ${activeComponent === "SolverTab" ? "active" : ""}`}
              >
                <a onClick={() => setActiveComponent("SolverTab")}>
                  {translations.solver}
                </a>
              </li>
              <li
                className={`uk-active ${activeComponent === "DescriptionTab" ? "active" : ""}`}
              >
                <a onClick={() => setActiveComponent("DescriptionTab")}>
                  {translations.description}
                </a>
              </li>
            </ul>
          </div>

          {/* Sprachwahl */}
          <div className="uk-navbar-right">
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
                        <span
                          className="uk-margin-small-right"
                          uk-icon="icon: flag"
                        ></span>{" "}
                        English
                      </a>
                    </li>
                    <li>
                      <a onClick={() => changeLanguage("de")}>
                        <span
                          className="uk-margin-small-right"
                          uk-icon="icon: flag"
                        ></span>{" "}
                        Deutsch
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Laden der Komponente */}
        <div className="uk-container" id={"all"}>
          {activeComponent === "SolverTab" && <SolverTab />}
          {activeComponent === "DescriptionTab" && <DescriptionTab />}
        </div>
      </div>
    </React.Fragment>
  );
}
