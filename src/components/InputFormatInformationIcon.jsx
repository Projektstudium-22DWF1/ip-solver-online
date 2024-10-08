import React, { useState, useEffect } from "react";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import "uikit/dist/css/uikit.min.css";

UIkit.use(Icons);

function InputFormatInformationIcon({ inputFormat }) {
  const lpProblem = `<pre style="background-color: #f0f0f0; margin: 0; padding: 10px;">
Maximize
  obj: 60 x<sub>1</sub> + 40 x<sub>2</sub>
Subject To
  machine_time: 2 x<sub>1</sub> + 3 x<sub>2</sub> <= 50
  material: 3 x<sub>1</sub> + 2 x<sub>2</sub> <= 60
Bounds
  x<sub>1</sub> >= 0
  x<sub>2</sub> >= 0
End</pre>`;

  const gmplProblem = `<pre style="background-color: #f0f0f0; margin: 0; padding: 10px;">
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

  const problemText =
    inputFormat === "LP"
      ? lpProblem
      : inputFormat === "GMPL"
      ? gmplProblem
      : "Unbekanntes Format";

  const [isVisible, setIsVisible] = useState(false);

  // UseEffect to listen for offcanvas open and close events
  useEffect(() => {
    const hideTooltip = () => setIsVisible(false);

    // Add event listener to listen for the offcanvas events
    UIkit.util.on(document, 'show', '#offcanvas-nav', hideTooltip);

    // Cleanup event listener
    return () => {
      UIkit.util.off(document, 'show', '#offcanvas-nav', hideTooltip);
    };
  }, []);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <span
        uk-icon="icon: info; ratio: 2"
        style={{
          cursor: "pointer",
        }}
        onClick={() => setIsVisible(!isVisible)} // Toggle visibility
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
            wordWrap: "break-word",
            padding: "10px", // Gleichmäßiger Rand um das Feld herum
            boxSizing: "border-box",
            whiteSpace: "pre-wrap",
            backgroundColor: "#f0f0f0", // Heller grauer Hintergrund
          }}
        >
          {/* Der Inhalt wird hier im inneren Container gerendert */}
          <div dangerouslySetInnerHTML={{ __html: problemText }} />
        </div>
      )}
    </div>
  );
}

export default InputFormatInformationIcon;
