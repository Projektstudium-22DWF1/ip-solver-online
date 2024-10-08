import React, { useContext } from "react";
// import { Link } from 'react-router-dom';
import { LanguageContext } from "../../context/LanguageContext";

function LandingPageTab() {
  const { translations } = useContext(LanguageContext);
  const navigateToSolver = () => {
    window.location.href = "/solver"
  }

  return (
    <React.Fragment>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh"}}>
        <h1>{translations.landingpageheader}</h1>
        <p>{translations.landingpagetext}</p>
        <button onClick={navigateToSolver}>{translations.landingpagebutton}</button>
      </div>
    </React.Fragment>
  );
}

export default LandingPageTab;
