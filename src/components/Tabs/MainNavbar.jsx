import React from "react";
import { useState } from "react";
import "uikit/dist/css/uikit.min.css";
import {SolverTab} from "./SolverTab";
import DescriptionTab from "./DescriptionTab";
import "./../styles/navbar.css"

export function MainNavbar() {
  const [activeComponent, setActiveComponent] = useState("SolverTab");

  return (
    <React.Fragment>
      <div>
        {/*Navigationsleiste*/}
        <nav className="uk-navbar-container" uk-navbar={"true"}>
          <div className="uk-navbar-left">
            <ul className="uk-navbar-nav">
              <li
                className={`uk-active ${activeComponent === "SolverTab" ? "active" : ""}`}
              >
                {" "}
                {/*active ist nur für css*/}
                <a
                  onClick={() => {
                    setActiveComponent("SolverTab");
                  }}
                >
                  Solver
                </a>
              </li>
              <li
                className={`uk-active ${activeComponent === "DescriptionTab" ? "active" : ""}`}
              >
                <a
                  onClick={() => {
                    setActiveComponent("DescriptionTab");
                  }}
                >
                  Description
                </a>
              </li>
            </ul>

            <span uk-icon="world"></span>
          </div>
        </nav>

        {/*Laden der Komponente*/}
        <div className="uk-container" id={"all"}>
          {activeComponent === "SolverTab" && <SolverTab />}
          {activeComponent === "DescriptionTab" && <DescriptionTab />}
        </div>
      </div>
    </React.Fragment>
  );
}
