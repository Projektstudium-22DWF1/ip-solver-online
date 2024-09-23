import React from "react";
import "uikit/dist/css/uikit.min.css";

export function SolveExamples() {
  function logExamples() {
    console.log("Beispiel in LP Format: ");
    console.log(
      "Maximize obj: x1 + 2 x2 + 4 x3 + x4 Subject To c1: - x1 + x2 + x3 + 10 x4 <= 20 c2: x1 - 4 x2 + x3 <= 30 c3: x2 - 0.5 x4 = 0 Bounds 0 <= x1 <= 40 2 <= x4 <= 3 End",
    );
    console.log("Beispiel in GMPL Format: ");
    console.log(
      "var x1 >= 0, <= 40; var x2; var x3; var x4 >= 2, <= 3; maximize obj: x1 + 2*x2 + 4*x3 + x4; s.t. c1: -x1 + x2 + x3 + 10*x4 <= 20; s.t. c2: x1 - 4*x2 + x3 <= 30; s.t. c3: x2 - 0.5*x4 = 0; end;",
    );
  }

  return (
    <React.Fragment>
      <button
        className="uk-button uk-button-success"
        type="button"
        onClick={logExamples}
      >
        Beispiele in der Konsole anzeigen
      </button>
    </React.Fragment>
  );
}
