import React, { useState } from "react";

const View = ({
  inputFormat,
  setInputFormat,
  inputData,
  setInputData,
  solveProblem,
  outputData,
}) => {
  const [activeTab, setActiveTab] = useState("summary");

  const renderSummary = () => {
    if (!outputData) return <p>Noch keine Daten verfügbar.</p>;

    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p><strong>Status:</strong> {outputData.Status}</p>
        <p><strong>Zielfunktionswert (Objective Value):</strong> {outputData.ObjectiveValue}</p>
        <p><strong>Berechnungszeit (Walltime):</strong> {outputData.Walltime} Sekunden</p>
      </div>
    );
  };

  const renderVariables = () => {
    if (!outputData?.Columns) return <p>Noch keine Variablen verfügbar.</p>;

    return (
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <table style={{ margin: "0 auto", borderCollapse: "collapse", width: "80%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Variable</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Primalwert</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Untere Schranke</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Obere Schranke</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Dualwert</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(outputData.Columns).map(([key, variable]) => (
              <tr key={key}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{variable.Name}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{variable.Primal}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{variable.Status}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{variable.Lower}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{variable.Upper ?? "∞"}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{variable.Dual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderConstraints = () => {
    if (!outputData?.Rows) return <p>Noch keine Restriktionen verfügbar.</p>;

    return (
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <table style={{ margin: "0 auto", borderCollapse: "collapse", width: "80%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Restriktion</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Primalwert</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Untere Schranke</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Obere Schranke</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Dualwert</th>
            </tr>
          </thead>
          <tbody>
            {outputData.Rows.map((row, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row.Name}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row.Primal}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row.Status}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row.Lower ?? "Keine"}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row.Upper ?? "∞"}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row.Dual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="solver-container">
      <h2>Solver</h2>
      <div>
        <label>Input Format:</label>
        <select
          value={inputFormat}
          onChange={(e) => setInputFormat(e.target.value)}
        >
          <option value="GMPL">GMPL</option>
          <option value="LP">LP</option>
        </select>
      </div>
      <textarea
        className="input-textarea"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Gib dein Optimierungsproblem hier ein..."
      />
      <button className="solve-button" onClick={solveProblem}>
        Problem lösen
      </button>

      <div className="tabs">
        <button onClick={() => setActiveTab("summary")}>Summary</button>
        <button onClick={() => setActiveTab("logs")}>Logs</button>
        <button onClick={() => setActiveTab("output")}>Output</button>
        <button onClick={() => setActiveTab("variables")}>Variables</button>
        <button onClick={() => setActiveTab("constraints")}>Constraints</button>
      </div>

      <div className="tab-content">
        {activeTab === "summary" && renderSummary()}
        {activeTab === "logs" && <div>Logs werden hier angezeigt.</div>}
        {activeTab === "output" && <div>Output wird hier angezeigt.</div>}
        {activeTab === "variables" && renderVariables()}
        {activeTab === "constraints" && renderConstraints()}
      </div>
    </div>
  );
};

export default View;
