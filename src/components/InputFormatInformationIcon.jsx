import React, { useState, useEffect } from "react";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import "uikit/dist/css/uikit.min.css";

UIkit.use(Icons);

function InputFormatInformationIcon({ inputFormat }) {
  // Define example problems for LP and GMPL formats
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

  // Set problem text based on the input format
  const problemText =
    inputFormat === "LP"
      ? lpProblem
      : inputFormat === "GMPL"
        ? gmplProblem
        : "Unbekanntes Format";

  const [isVisible, setIsVisible] = useState(false);

  // Close tooltip when offcanvas menu is opened
  useEffect(() => {
    const hideTooltip = () => setIsVisible(false);

    UIkit.util.on(document, "show", "#offcanvas-nav", hideTooltip);

    return () => {
      UIkit.util.off(document, "show", "#offcanvas-nav", hideTooltip);
    };
  }, []);

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
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: problemText }} />
        </div>
      )}
    </div>
  );
}

export default InputFormatInformationIcon;
