import React, { useEffect, useRef } from "react";
import "./styles/styles.css";

function ErrorMessage({ errorData, setErrorData }) {
  const timerRef = useRef(null);

  useEffect(() => {
    // Check if there is an error message
    if (errorData && errorData.message) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Set a timeout to clear the error message after 10 seconds
      timerRef.current = setTimeout(() => {
        setErrorData("");
      }, 10000);
    }

    // Cleanup function to clear the timeout when the component unmounts
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [errorData, errorData.id, setErrorData]);

  // If there's no error message, do not render anything
  if (!errorData || !errorData.message) return null;

  return <div className="error-container">{"Error: " + errorData.message}</div>;
}

export default ErrorMessage;
