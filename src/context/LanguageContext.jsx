import React, { createContext, useState } from "react";
import en from "../locales/en.json";
import de from "../locales/de.json";

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const languages = { en, de };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider
      value={{ language, changeLanguage, translations: languages[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
