import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

function DescriptionTab() {
  const { translations } = useContext(LanguageContext); 

  return (
    <React.Fragment>
      <div>{translations.descriptionText}</div> 
    </React.Fragment>
  );
}

export default DescriptionTab;
