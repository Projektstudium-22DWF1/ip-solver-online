import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

function Footer() {
  const { translations } = useContext(LanguageContext); 

  return (
    <footer className="uk-section uk-section-small uk-text-center uk-background-muted">
      <div className="uk-container">
        <p>© {translations.footerText}</p>
      </div>
    </footer>
  );
}

export default Footer;