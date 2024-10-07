import React, { useEffect } from "react";
import "./styles/styles.css"

function ErrorMessage({ errorData, setErrorData }){

  useEffect(() => {
    if (errorData) {
      const timer = setTimeout(() => {
        setErrorData(""); // Fehlerzustand nach 10 Sekunden zurücksetzen
      }, 10000); // 10000ms = 10 Sekunden

      return () => clearTimeout(timer); // Timer bereinigen, wenn die Komponente neu gerendert wird
    }
  }, [errorData, setErrorData]);

  if (!errorData) return null;

  return (
    <div className="error-container">
      {errorData}
    </div>
  );
};

export default ErrorMessage;