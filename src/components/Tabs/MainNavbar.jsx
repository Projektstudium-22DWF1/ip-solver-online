import React from "react";
import { useState } from "react";
import "uikit/dist/css/uikit.min.css";
import { GmplProbleme } from "./GmplTab";
import { LpProbleme } from "./LpTab";
import { Beschreibung } from "./DescriptionTab";
import "./styles/navbar.css";

export function InputUi() {
  const [activeComponent, setActiveComponent] = useState("einfache");

  const handleNavClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <React.Fragment>
      <div>
        {/*Navigationsleiste*/}
        <nav className="uk-navbar-container" uk-navbar={"true"}>
          <div className="uk-navbar-left">
            <ul className="uk-navbar-nav">
              <li
                className={`uk-active ${activeComponent === "einfache" ? "active" : ""}`}
              >
                {" "}
                {/*active ist nur für css*/}
                <a
                  onClick={() => {
                    handleNavClick("einfache");
                  }}
                >
                  LP Probleme
                </a>
              </li>
              <li
                className={`uk-active ${activeComponent === "komplexe" ? "active" : ""}`}
              >
                <a
                  onClick={() => {
                    handleNavClick("komplexe");
                  }}
                >
                  GMPL Probleme
                </a>
              </li>
              <li
                className={`uk-active ${activeComponent === "beschreibung" ? "active" : ""}`}
              >
                <a
                  onClick={() => {
                    handleNavClick("beschreibung");
                  }}
                >
                  Beschreibung der Anwendung
                </a>
              </li>
            </ul>

            <span uk-icon="world"></span>
          </div>
        </nav>

        {/*Laden der Komponente*/}
        <div className="uk-container" id={"all"}>
          {activeComponent === "einfache" && <LpProbleme />}
          {activeComponent === "komplexe" && <GmplProbleme />}
          {activeComponent === "beschreibung" && <Beschreibung />}
        </div>
      </div>
    </React.Fragment>
  );
}
