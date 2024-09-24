import React, { useState } from "react";
import "uikit/dist/css/uikit.min.css";

const OutputUi = ({
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
  const renderLog = () => {
    if (!outputData) return <p>Noch keine Logs verfügbar.</p>;
    if (!outputData.hasOwnProperty("GlpkLog"))
      return <p>Logs sind von HIGHS Solver nicht unterstützt</p>;

    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <pre>{outputData.GlpkLog} </pre>
      </div>
    );
  };
  const renderOutput = () => {
    if (!outputData) return <p>Noch kein Output verfügbar.</p>;
    if (!outputData.hasOwnProperty("GlpkOutput"))
      return <p>Output ist von HIGHS Solver nicht unterstützt</p>;
    if (outputData.GlpkOutput?.trim().length === 0)
      return <p>Dieses Modell generiert keinen Output.</p>;
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <pre>{outputData.GlpkOutput} </pre>
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
                <td className="uk-text-center">{variable.Lower ?? "-∞"}</td>
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
                <td className="uk-text-center">{row.Lower ?? "-∞"}</td>
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
        {activeTab === "logs" && renderLog()}
        {activeTab === "output" && renderOutput()}
        {activeTab === "variables" && renderVariables()}
        {activeTab === "constraints" && renderConstraints()}
      </div>
    </div>
  );
};

export default OutputUi;
