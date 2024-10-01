import React, { useEffect } from "react";

function ImportTextareaStyleChooser({
  textareaStyle,
  setTextareaStyle,
  inputFormat,
}) {
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
        uk-tooltip={
          isGMPL ? "Textarea style cannot be changed in GMPL format." : ""
        }
      >
        Switch to {textareaStyle === "Guided" ? "Raw" : "Guided"}
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
