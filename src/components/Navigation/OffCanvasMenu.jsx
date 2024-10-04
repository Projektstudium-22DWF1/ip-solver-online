// components/Tabs/OffCanvasMenu.jsx
import React, { useContext } from "react";
import UIkit from 'uikit';
import { LanguageContext } from "../../context/LanguageContext";

const OffCanvasMenu = ({ setActiveComponent }) => {
  const { translations } = useContext(LanguageContext);

  return (
    <div id="offcanvas-nav" uk-offcanvas="overlay: true">
      <div className="uk-offcanvas-bar" style={{ backgroundColor: "#fff" }}>
        <button className="uk-offcanvas-close" type="button" uk-close="true"></button>
        <ul className="uk-nav uk-nav-default">
          <li>
            <a
              onClick={() => {
                setActiveComponent("SolverTab");
                UIkit.offcanvas('#offcanvas-nav').hide(); // Close off-canvas on click
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
                UIkit.offcanvas('#offcanvas-nav').hide(); // Close off-canvas on click
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
