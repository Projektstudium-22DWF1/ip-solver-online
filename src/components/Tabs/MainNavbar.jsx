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
              <li className={`uk-active ${activeComponent === "SolverTab" ? "active" : ""}`}>
                <a onClick={() => setActiveComponent("SolverTab")}>
                  {translations.solver}
                </a>
              </li>
              <li className={`uk-active ${activeComponent === "DescriptionTab" ? "active" : ""}`}>
                <a onClick={() => setActiveComponent("DescriptionTab")}>
                  {translations.description}
                </a>
              </li>
            </ul>

            {/* Sprachwahl */}
            <div className="uk-navbar-item">
              <span uk-icon="world"></span>
              <div className="uk-margin-small-left">
                <select onChange={(e) => changeLanguage(e.target.value)} defaultValue="en">
                  <option value="en">English</option>
                  <option value="de">Deutsch</option>
                </select>
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
