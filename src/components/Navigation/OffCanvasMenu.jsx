// components/Tabs/OffCanvasMenu.jsx
import React, { useContext } from "react";
import UIkit from "uikit";
import { LanguageContext } from "../../context/LanguageContext";
import logo from "../../assets/logo.png";

const OffCanvasMenu = ({ setActiveComponent }) => {
  const { translations } = useContext(LanguageContext);

  return (
    <div id="offcanvas-nav" uk-offcanvas="overlay: true">
      <div
        className="uk-offcanvas-bar uk-width-1-2"
        style={{ backgroundColor: "#fff" }}
      >
        <button
          className="uk-offcanvas-close"
          type="button"
          uk-close="true"
        ></button>
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
            marginTop: "5px",
          }}
        >
          <img src={logo} alt="OptiMize Logo" style={{ width: "60px" }} />
        </div>
        <ul className="uk-nav uk-nav-default">
          <li>
            <a
              onClick={() => {
                setActiveComponent("LandingPageTab");
                UIkit.offcanvas("#offcanvas-nav").hide(); // Close off-canvas on click
              }}
              style={{ color: "#000" }}
            >
              {translations.landingpage}
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setActiveComponent("SolverTab");
                UIkit.offcanvas("#offcanvas-nav").hide(); // Close off-canvas on click
              }}
              style={{ color: "#000" }}
            >
              {translations.solver}
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setActiveComponent("DescriptionTab");
                UIkit.offcanvas("#offcanvas-nav").hide(); // Close off-canvas on click
              }}
              style={{ color: "#000" }}
            >
              {translations.description}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OffCanvasMenu;
