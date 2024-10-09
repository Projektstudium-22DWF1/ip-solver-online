import React, { useEffect, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext"; 

function ImportTextareaStyleChooser({
  textareaStyle,
  setTextareaStyle,
  inputFormat,
  setProblem,
}) {
  const { translations } = useContext(LanguageContext); // Access translations
  const isGMPL = inputFormat === "GMPL"; // Check if inputFormat is GMPL

  // Toggles between "Raw" and "Guided"
  const toggleStyle = () => {
    setTextareaStyle((prevStyle) =>
      prevStyle === "Guided" ? "Raw" : "Guided",
    );
  };

  // Clears problem when textareaStyle changes
  useEffect(() => {
    setProblem("");
  }, [textareaStyle, setProblem]);

  // Automatically sets textareaStyle to "Raw" if format is GMPL
  useEffect(() => {
    if (isGMPL) {
      setTextareaStyle("Raw");
    }
  }, [isGMPL, setTextareaStyle]);

  // Resets textareaStyle to "Guided" when not using GMPL
  useEffect(() => {
    if (!isGMPL) {
      setTextareaStyle("Guided");
    }
  }, [isGMPL, setTextareaStyle]);

  return (
    <div>
      {/* Button with tooltip, disabled when GMPL is selected */}
      <button
        onClick={toggleStyle}
        className={`uk-button uk-button-secondary ${isGMPL ? "disabled-button" : ""}`}
        disabled={isGMPL}
        data-uk-tooltip={`title:${isGMPL ? translations.gmplTooltip : ""}; pos: bottom-right`}
      >
        {translations.switchTo}{" "}
        {textareaStyle === "Guided" ? translations.raw : translations.guided}
      </button>

      {/* CSS for disabled button */}
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
