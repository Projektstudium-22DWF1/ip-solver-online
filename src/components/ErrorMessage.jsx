import React, { useEffect, useRef } from "react";
import "./styles/styles.css";

function ErrorMessage({ errorData, setErrorData }) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (errorData && errorData.message) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setErrorData("");
      }, 10000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [errorData, errorData.id, setErrorData]);

  if (!errorData || !errorData.message) return null;

  return <div className="error-container">{"Error: " + errorData.message}</div>;
}

export default ErrorMessage;
