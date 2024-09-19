import React, { useState } from "react";
import "uikit/dist/css/uikit.min.css";

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
        <p>
          <strong>Status:</strong> {outputData.Status}
        </p>
        <p>
          <strong>Zielfunktionswert (Objective Value):</strong>{" "}
          {outputData.ObjectiveValue}
        </p>
        <p>
          <strong>Berechnungszeit (Walltime):</strong> {outputData.Walltime}{" "}
          Sekunden
        </p>
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
              <th className="uk-text-center">Variable</th>
              <th className="uk-text-center">Primalwert</th>
              <th className="uk-text-center">Status</th>
              <th className="uk-text-center">Untere Schranke</th>
              <th className="uk-text-center">Obere Schranke</th>
              <th className="uk-text-center">Dualwert</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(outputData.Columns).map(([key, variable]) => (
              <tr key={key}>
                <td className="uk-text-center">{variable.Name}</td>
                <td className="uk-text-center">{variable.Primal}</td>
                <td className="uk-text-center">{variable.Status}</td>
                <td className="uk-text-center">{variable.Lower}</td>
                <td className="uk-text-center">{variable.Upper ?? "∞"}</td>
                <td className="uk-text-center">{variable.Dual}</td>
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
              <th className="uk-text-center">Restriktion</th>
              <th className="uk-text-center">Primalwert</th>
              <th className="uk-text-center">Status</th>
              <th className="uk-text-center">Untere Schranke</th>
              <th className="uk-text-center">Obere Schranke</th>
              <th className="uk-text-center">Dualwert</th>
            </tr>
          </thead>
          <tbody>
            {outputData.Rows.map((row, index) => (
              <tr key={index}>
                <td className="uk-text-center">{row.Name}</td>
                <td className="uk-text-center">{row.Primal}</td>
                <td className="uk-text-center">{row.Status}</td>
                <td className="uk-text-center">{row.Lower ?? "Keine"}</td>
                <td className="uk-text-center">{row.Upper ?? "∞"}</td>
                <td className="uk-text-center">{row.Dual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="uk-container uk-margin-top">
      <h2 className="uk-heading-line">
        <span>Input</span>
      </h2>

      <div className="uk-margin">
        <label>Format: </label>
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

      <button
        className="uk-button uk-button-primary uk-margin-bottom"
        onClick={solveProblem}
      >
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
      <div>
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
