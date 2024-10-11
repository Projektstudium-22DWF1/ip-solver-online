import React, { useContext } from "react";
import { openProblemFile, saveProblemToFile } from "../services/FileHandler";
import "uikit/dist/css/uikit.min.css";
import { LanguageContext } from "../context/LanguageContext";

function FileButtons({ problem, setProblem, textAreaStyle }) {
  const { translations } = useContext(LanguageContext);

  // Handle importing a file (reads a file and sets the content as problem)
  const handleImport = async () => {
    try {
      const text = await openProblemFile();
      setProblem(text);
    } catch (error) {
      console.error("Error importing file:", error);
    }
  };

  // Handle exporting the current problem to a file
  const handleExport = async () => {
    try {
      await saveProblemToFile(problem);
    } catch (error) {
      console.error("Error exporting file:", error);
    }
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      {/* Button for importing a file */}
      <button
      className={`uk-button uk-button-secondary ${textAreaStyle === "Guided" ? "disabled-button" : ""}`}
      onClick={handleImport}
      disabled={textAreaStyle === "Guided"}
        style={{ marginRight: "10px" }}
      >
        {translations.import} <span uk-icon="icon: upload"></span>
      </button>

      {/* Button for exporting the problem */}
      <button className="uk-button uk-button-secondary" onClick={handleExport}>
        {translations.export} <span uk-icon="icon: download"></span>
      </button>
    </div>
  );
}

export default FileButtons;
