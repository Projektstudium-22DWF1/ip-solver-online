import React, { useState } from 'react';

const highs_settings = {
  locateFile: (file) => "https://lovasoa.github.io/highs-js/" + file,
};
const highs_promise = require("highs")(highs_settings);

const HighsSolver = () => {
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState(null);

  const solveProblem = async () => {
    try {
      const highs = await highs_promise;

      const result = highs.solve(inputData);

      setOutputData(JSON.stringify(result, null, 2));
    } catch (error) {
      setOutputData(`Fehler: ${error.message}`);
    }
  };

  return (
    <div className="solver-container">
      <h2>HIGHS Solver</h2>
      <textarea
        className="input-textarea"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Gib dein Optimierungsproblem hier ein..."
      />
      <button className="solve-button" onClick={solveProblem}>Problem lösen</button>

      {outputData && (
        <div className="output-container">
          <h2>Ergebnis:</h2>
          <pre className="output-data">{outputData}</pre>
        </div>
      )}
      <h3>Example:</h3>
      <pre>
        Maximize
        obj:
        x1 + 2 x2 + 4 x3 + x4
        Subject To
        c1: - x1 + x2 + x3 + 10 x4 &lt;= 20
        c2: x1 - 4 x2 + x3 &lt;= 30
        c3: x2 - 0.5 x4 = 0
        Bounds
        0 &lt;= x1 &lt;= 40
        2 &lt;= x4 &lt;= 3
        End
      </pre>
    </div>
  );
};

export default HighsSolver;
