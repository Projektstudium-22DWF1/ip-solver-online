import React from 'react';
import { openProblemFile, saveProblemToFile } from '../services/FileHandler'; 
import "uikit/dist/css/uikit.min.css";

function FileButtons({ problem, setProblem }) {
  // Funktion zum Importieren der Datei
  const handleImport = async () => {
    try {
      const text = await openProblemFile();
      setProblem(text); 
    } catch (error) {
      console.error('Fehler beim Importieren der Datei:', error);
    }
  };

  // Funktion zum Exportieren der Datei
  const handleExport = async () => {
    try {
      await saveProblemToFile(problem);
    } catch (error) {
      console.error('Fehler beim Exportieren der Datei:', error);
    }
  };

  return (
    <div>
      <button className="uk-button uk-button-secondary uk-button-large" onClick={handleImport}>Importieren</button>
      <button className="uk-button uk-button-secondary uk-button-large" onClick={handleExport}>Exportieren</button>
    </div>
  );
}

export default FileButtons;
