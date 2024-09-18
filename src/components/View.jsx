import React, { useState } from "react";
import 'uikit/dist/css/uikit.min.css';

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
        <table className="uk-table uk-table-divider uk-table-hover">
          <thead>
            <tr>
              <th>Variable</th>
              <th>Primalwert</th>
              <th>Status</th>
              <th>Untere Schranke</th>
              <th>Obere Schranke</th>
              <th>Dualwert</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(outputData.Columns).map(([key, variable]) => (
              <tr key={key}>
                <td>{variable.Name}</td>
                <td>{variable.Primal}</td>
                <td>{variable.Status}</td>
                <td>{variable.Lower}</td>
                <td>{variable.Upper ?? "∞"}</td>
                <td>{variable.Dual}</td>
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
        <table className="uk-table uk-table-divider uk-table-hover">
          <thead>
            <tr>
              <th>Restriktion</th>
              <th>Primalwert</th>
              <th>Status</th>
              <th>Untere Schranke</th>
              <th>Obere Schranke</th>
              <th>Dualwert</th>
            </tr>
          </thead>
          <tbody>
            {outputData.Rows.map((row, index) => (
              <tr key={index}>
                <td>{row.Name}</td>
                <td>{row.Primal}</td>
                <td>{row.Status}</td>
                <td>{row.Lower ?? "Keine"}</td>
                <td>{row.Upper ?? "∞"}</td>
                <td>{row.Dual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="uk-container uk-margin-top">
      <h2 className="uk-heading-line"><span>Solver</span></h2>

      <div className="uk-margin">
        <label>Input Format:</label>
        <select
          className="uk-select uk-form-width-medium"
          value={inputFormat}
          onChange={(e) => setInputFormat(e.target.value)}
        >
          <option value="GMPL">GMPL</option>
          <option value="LP">LP</option>
        </select>
      </div>

      <textarea
        className="uk-textarea uk-margin-bottom"
        rows="5"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Gib dein Optimierungsproblem hier ein..."
      />

      <button className="uk-button uk-button-primary uk-margin-bottom" onClick={solveProblem}>
        Problem lösen
      </button>

      {/* UIkit Tabs */}
      <ul className="uk-tab" uk-tab="true">
        <li className={activeTab === "summary" ? "uk-active" : ""}>
          <a onClick={() => setActiveTab("summary")}>Summary</a>
        </li>
        <li className={activeTab === "logs" ? "uk-active" : ""}>
          <a onClick={() => setActiveTab("logs")}>Logs</a>
        </li>
        <li className={activeTab === "output" ? "uk-active" : ""}>
          <a onClick={() => setActiveTab("output")}>Output</a>
        </li>
        <li className={activeTab === "variables" ? "uk-active" : ""}>
          <a onClick={() => setActiveTab("variables")}>Variables</a>
        </li>
        <li className={activeTab === "constraints" ? "uk-active" : ""}>
          <a onClick={() => setActiveTab("constraints")}>Constraints</a>
        </li>
      </ul>

      {/* Content Switcher for Tabs */}
      <ul>
        {activeTab === "summary" && <div>{renderSummary()}</div>}
        {activeTab === "logs" && <div><div>Logs werden hier angezeigt.</div></div>}
        {activeTab === "output" && <div><div>Output wird hier angezeigt.</div></div>}
        {activeTab === "variables" && <div>{renderVariables()}</div>}
        {activeTab === "constraints" && <div>{renderConstraints()}</div>}
      </ul>
    </div>
  );
};

export default View;
