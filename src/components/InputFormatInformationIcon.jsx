import React, { useState } from "react";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import "uikit/dist/css/uikit.min.css";

UIkit.use(Icons);

function InputFormatInformationIcon({ inputFormat }) {

  const lpProblem = `<pre>
  Maximize
     obj: 60 x<sub>1</sub> + 40 x<sub>2</sub>
  Subject To
     machine_time: 2 x<sub>1</sub> + 3 x<sub>2</sub> <= 50
     material: 3 x<sub>1</sub> + 2 x<sub>2</sub> <= 60
  Bounds
     x<sub>1</sub> >= 0
     x<sub>2</sub> >= 0
  End</pre>
  `;
  
    const gmplProblem = `<pre>
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
          className="uk-card uk-card-default uk-width-auto"
          style={{
            position: "absolute",
            top: "40px", // Positionierung direkt unterhalb des Icons (ggf. anpassen)
            left: "0", // Links ausrichten (oder nach Bedarf anpassen)
            zIndex: "1000", // Sicherstellen, dass die Box über anderen Elementen liegt
            maxWidth: "500px",
          }}
        >
<div dangerouslySetInnerHTML={{ __html: problemText }} /></div>
      )}
    </div>
  );
}

export default InputFormatInformationIcon;
