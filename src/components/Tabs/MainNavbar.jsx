import React, { useContext, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import "uikit/dist/css/uikit.min.css";
import { SolverTab } from "./SolverTab";
import DescriptionTab from "./DescriptionTab";
import LanguageSelector from "./LanguageSelector"; // Import the LanguageSelector component

export function MainNavbar() {
  const [activeComponent, setActiveComponent] = useState("SolverTab");
  const { translations } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <div>
        {/* Sticky Navbar */}
        <nav 
          className="uk-navbar-container" 
          uk-navbar="true" 
          uk-sticky="animation: uk-animation-slide-top; sel-target: .uk-navbar; cls-active: uk-navbar-sticky; top: 0; z-index: 1000;">
          <div className="uk-navbar-left">
            <ul className="uk-navbar-nav uk-flex" style={{ minWidth: "300px" }}> {/* Set fixed min-width */}
              <li className={`uk-active uk-width-expand ${activeComponent === "SolverTab" ? "active" : ""}`}>
                <a className="uk-text-center" onClick={() => setActiveComponent("SolverTab")}>
                  {translations.solver}
                </a>
              </li>
              <li className={`uk-active uk-width-expand ${activeComponent === "DescriptionTab" ? "active" : ""}`}>
                <a className="uk-text-center" onClick={() => setActiveComponent("DescriptionTab")}>
                  {translations.description}
                </a>
              </li>
            </ul>
          </div>

          {/* Language Selector */}
          <div className="uk-navbar-right">
            <LanguageSelector />
          </div>
        </nav>

        {/* Main content */}
        <div className="uk-container" id="all" style={{ paddingTop: "50px" }}>
          {activeComponent === "SolverTab" && <SolverTab />}
          {activeComponent === "DescriptionTab" && <DescriptionTab />}
        </div>
      </div>
    </React.Fragment>
  );
}
