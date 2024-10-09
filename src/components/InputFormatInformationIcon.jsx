import React, { useState, useEffect, useContext } from "react";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import "uikit/dist/css/uikit.min.css";
import { LanguageContext } from "../context/LanguageContext";

UIkit.use(Icons);

function InputFormatInformationIcon({ inputFormat }) {
  const { translations } = useContext(LanguageContext);

  // Define example problems for LP and GMPL formats
  const lpProblemText = `Maximize
  obj: 60 x1 + 40 x2
Subject To
  machine_time: 2 x1 + 3 x2 <= 50
  material: 3 x1 + 2 x2 <= 60
Bounds
  x1 >= 0
  x2 >= 0
End`;

  const gmplProblemText = `set Products;
param cost{Products};
param availability{Products};
param profit{Products};
var Production{Products} >= 0;

maximize TotalProfit:
  sum {p in Products} profit[p] * Production[p];
  
subject to ResourceConstraint:
  sum {p in Products} cost[p] * Production[p] <= 1000;
     
data;
set Products := Product1 Product2;
param cost := Product1 2 Product2 3;
param availability := Product1 100 Product2 200;
param profit := Product1 50 Product2 40;
end;`;

  // Define the problem with HTML tags for display purposes
  const lpProblemHtml = `<pre style="background-color: #f0f0f0; margin: 0; padding: 10px;">
Maximize
  obj: 60 x<sub>1</sub> + 40 x<sub>2</sub>
Subject To
  machine_time: 2 x<sub>1</sub> + 3 x<sub>2</sub> <= 50
  material: 3 x<sub>1</sub> + 2 x<sub>2</sub> <= 60
Bounds
  x<sub>1</sub> >= 0
  x<sub>2</sub> >= 0
End</pre>`;

  const gmplProblemHtml = `<pre style="background-color: #f0f0f0; margin: 0; padding: 10px;">
set Products;
param cost{Products};
param availability{Products};
param profit{Products};
var Production{Products} >= 0;

maximize TotalProfit:
  sum {p in Products} profit[p] * Production[p];
  
subject to ResourceConstraint:
  sum {p in Products} cost[p] * Production[p] <= 1000;
     
data;
set Products := Product1 Product2;
param cost := Product1 2 Product2 3;
param availability := Product1 100 Product2 200;
param profit := Product1 50 Product2 40;
end;</pre>`;

  // Choose text or HTML depending on the input format
  const problemText =
    inputFormat === "LP"
      ? lpProblemText
      : inputFormat === "GMPL"
        ? gmplProblemText
        : "";
  const problemHtml =
    inputFormat === "LP"
      ? lpProblemHtml
      : inputFormat === "GMPL"
        ? gmplProblemHtml
        : "Unknown format";

  const [isVisible, setIsVisible] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  // Close tooltip when offcanvas menu is opened
  useEffect(() => {
    const hideTooltip = () => setIsVisible(false);
    UIkit.util.on(document, "show", "#offcanvas-nav", hideTooltip);
    return () => {
      UIkit.util.off(document, "show", "#offcanvas-nav", hideTooltip);
    };
  }, []);

  // Function to copy only the plain text (without HTML tags) to the clipboard and close tooltip
  const copyToClipboard = () => {
    const textArea = document.createElement("textarea");
    textArea.style.position = "fixed"; // Prevent scrolling to bottom
    textArea.style.opacity = "0"; // Make it invisible
    textArea.value = problemText; // Set the plain text content
    document.body.appendChild(textArea);
    textArea.select(); // Select the content
    document.execCommand("copy"); // Copy the content
    document.body.removeChild(textArea); // Remove the temporary element

    setCopySuccess(translations.copied); // Show 'Copied!' message in the selected language
    setTimeout(() => {
      setCopySuccess("");
      setIsVisible(false); // Close the tooltip after copy
    }, 1500); // Reset after 1.5 seconds
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <span
        uk-icon="icon: info; ratio: 2"
        style={{ cursor: "pointer" }}
        onClick={() => setIsVisible(!isVisible)}
      ></span>

      {isVisible && (
        <div
          className="uk-card uk-card-default"
          style={{
            position: "absolute",
            top: "40px",
            right: "0",
            zIndex: "1000",
            maxWidth: "90vw",
            width: "fit-content",
            overflowX: "auto",
            padding: "10px",
            backgroundColor: "#f0f0f0",
            boxSizing: "border-box",
          }}
        >
          {/* Copy button */}
          <button
            onClick={copyToClipboard}
            className="uk-button uk-button-default"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "#e0e0e0", // Gray tone
              color: "#333", // Dark text color
              border: "none", // No border
              cursor: "pointer",
            }}
          >
            {translations.copy}{" "}
            {/* Label for the "Copy" button based on the selected language */}
          </button>

          {/* Problem text rendered with HTML */}
          <div dangerouslySetInnerHTML={{ __html: problemHtml }} />

          {copySuccess && (
            <span
              style={{
                marginTop: "10px",
                color: "green",
                display: "block",
                textAlign: "center",
              }}
            >
              {copySuccess}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default InputFormatInformationIcon;
