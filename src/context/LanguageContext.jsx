import React, { createContext, useState } from "react";
import en from "../locales/en.json";
import de from "../locales/de.json";

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const languages = { en, de };

  // Function to switch languages
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    // Provide the current language and changeLanguage function to the app
    <LanguageContext.Provider
      value={{ language, changeLanguage, translations: languages[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
