import React, { useContext } from "react";
// import { Link } from 'react-router-dom';
import { LanguageContext } from "../../context/LanguageContext";

function LandingPageTab({ setActiveComponent }) {
  const { translations } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 500px)",
        }}
      >
        <h1>{translations.landingpageheader}</h1>
        <p>{translations.landingpagetext}</p>
        <button
          className="landing-page-button"
          onClick={() => setActiveComponent("SolverTab")}
        >
          {translations.landingpagebutton}
        </button>
      </div>
    </React.Fragment>
  );
}

export default LandingPageTab;
