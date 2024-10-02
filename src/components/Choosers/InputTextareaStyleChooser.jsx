import React, { useEffect, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext"; // Importiere den Kontext

function ImportTextareaStyleChooser({
  textareaStyle,
  setTextareaStyle,
  inputFormat,
}) {
  const { translations } = useContext(LanguageContext); // Zugriff auf Übersetzungen
  const isGMPL = inputFormat === "GMPL"; // Überprüfen, ob das Property 'GMPL' ist

  // Funktion zum Umschalten zwischen Raw und Guided
  const toggleStyle = () => {
    setTextareaStyle((prevStyle) =>
      prevStyle === "Guided" ? "Raw" : "Guided",
    );
  };

  // useEffect-Hook, um textareaStyle automatisch auf "Raw" zu setzen, wenn format "GMPL" ist
  useEffect(() => {
    if (isGMPL) {
      setTextareaStyle("Raw");
    }
  }, [isGMPL, setTextareaStyle]); // Läuft, wenn isGMPL sich ändert

  return (
    <div>
      {/* Button mit Tooltip und Styling für disabled Zustand */}
      <button
        onClick={toggleStyle}
        className={`uk-button uk-button-secondary ${isGMPL ? "disabled-button" : ""}`}
        disabled={isGMPL}
        uk-tooltip={isGMPL ? translations.gmplTooltip : ""}
      >
        {translations.switchTo}{" "}
        {textareaStyle === "Guided" ? translations.raw : translations.guided}
      </button>

      {/* CSS für deaktivierten Button */}
      <style>{`
        .disabled-button {
          background-color: grey !important;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export default ImportTextareaStyleChooser;
