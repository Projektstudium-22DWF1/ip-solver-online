// components/Tabs/MainNavbar.jsx
import React, { useContext, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import "uikit/dist/css/uikit.min.css";
import LandingPageTab from "../Tabs/LandingPageTab";
import { SolverTab } from "../Tabs/SolverTab";
import DescriptionTab from "../Tabs/DescriptionTab";
import LanguageSelector from "./LanguageSelector";
import BurgerMenuButton from "./BurgerMenuButton";
import OffCanvasMenu from "./OffCanvasMenu";
import logo from "../../assets/logo.png";

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
          uk-sticky="animation: uk-animation-slide-top; sel-target: .uk-navbar; cls-active: uk-navbar-sticky; top: 0; z-index: 1000;"
        >
          <div className="uk-navbar-left">
            {/* Tabs for larger screens */}
            <ul
              className="uk-navbar-nav uk-flex uk-visible@s"
              style={{ minWidth: "380px", padding: "0", margin: "0", gap: "0" }}
            >
              <li
                className={`uk-active uk-width-expand ${activeComponent === "LandingPageTab" ? "active" : ""}`}
              >
                <a
                  className="uk-text-center"
                  onClick={() => setActiveComponent("LandingPageTab")}
                >
                  <img src={logo} alt="OptiMize Logo" style={{width: "35px", marginRight: "2px"}}/>
                  {translations.landingpage}
                </a>
              </li>
              <li
                className={`uk-active uk-width-expand ${activeComponent === "SolverTab" ? "active" : ""}`}
              >
                <a
                  className="uk-text-center"
                  onClick={() => setActiveComponent("SolverTab")}
                >
                  {translations.solver}
                </a>
              </li>
              <li
                className={`uk-active uk-width-expand ${activeComponent === "DescriptionTab" ? "active" : ""}`}
              >
                <a
                  className="uk-text-center"
                  onClick={() => setActiveComponent("DescriptionTab")}
                >
                  {translations.description}
                </a>
              </li>
            </ul>

            {/* Burger Menu for small screens */}
            <BurgerMenuButton />
          </div>

          {/* Language Selector */}
          <div className="uk-navbar-right">
            <LanguageSelector />
          </div>
        </nav>

        {/* Off-canvas Menu for mobile screens */}
        <OffCanvasMenu setActiveComponent={setActiveComponent} />

        {/* Main content */}
        <div className="uk-container" id="all" style={{ paddingTop: "50px" }}>
          {activeComponent === "LandingPageTab" && <LandingPageTab />}
          {activeComponent === "SolverTab" && <SolverTab />}
          {activeComponent === "DescriptionTab" && <DescriptionTab />}
        </div>
      </div>
    </React.Fragment>
  );
}
