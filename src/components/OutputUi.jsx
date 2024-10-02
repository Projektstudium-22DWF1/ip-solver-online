import React, { useState, useContext } from "react";
import "uikit/dist/css/uikit.min.css";
import { LanguageContext } from "../context/LanguageContext"; // Importiere den Kontext

const OutputUi = ({ outputData }) => {
  const { translations } = useContext(LanguageContext); // Zugriff auf Übersetzungen
  const [activeTab, setActiveTab] = useState("summary");

  const renderSummary = () => {
    if (!outputData) return <p>{translations.noDataAvailable}</p>;

    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>
          <strong>{translations.status}:</strong> {outputData.Status}
        </p>
        <p>
          <strong>{translations.objectiveValue}:</strong> {outputData.ObjectiveValue}
        </p>
        <p>
          <strong>{translations.walltime}:</strong> {outputData.Walltime} {translations.seconds}
        </p>
      </div>
    );
  };

  const renderLog = () => {
    if (!outputData) return <p>{translations.noLogsAvailable}</p>;
    if (!outputData.hasOwnProperty("GlpkLog"))
      return <p>{translations.logsNotSupported}</p>;

    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <pre>{outputData.GlpkLog}</pre>
      </div>
    );
  };

  const renderOutput = () => {
    if (!outputData) return <p>{translations.noOutputAvailable}</p>;
    if (!outputData.hasOwnProperty("GlpkOutput"))
      return <p>{translations.outputNotSupported}</p>;
    if (outputData.GlpkOutput?.trim().length === 0)
      return <p>{translations.modelGeneratesNoOutput}</p>;

    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <pre>{outputData.GlpkOutput}</pre>
      </div>
    );
  };

  const renderVariables = () => {
    if (!outputData?.Columns) return <p>{translations.noVariablesAvailable}</p>;

    return (
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <table className="uk-table uk-table-divider uk-table-hover">
          <thead>
            <tr>
              <th className="uk-text-center">{translations.variable}</th>
              <th className="uk-text-center">{translations.primalValue}</th>
              <th className="uk-text-center">{translations.status}</th>
              <th className="uk-text-center">{translations.lowerBound}</th>
              <th className="uk-text-center">{translations.upperBound}</th>
              <th className="uk-text-center">{translations.dualValue}</th>
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
    if (!outputData?.Rows) return <p>{translations.noConstraintsAvailable}</p>;

    return (
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <table className="uk-table uk-table-divider uk-table-hover">
          <thead>
            <tr>
              <th className="uk-text-center">{translations.constraint}</th>
              <th className="uk-text-center">{translations.primalValue}</th>
              <th className="uk-text-center">{translations.status}</th>
              <th className="uk-text-center">{translations.lowerBound}</th>
              <th className="uk-text-center">{translations.upperBound}</th>
              <th className="uk-text-center">{translations.dualValue}</th>
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
          <a onClick={() => setActiveTab("summary")}>{translations.summary}</a>
        </li>
        <li className={activeTab === "logs" ? "uk-active" : ""}>
          <a onClick={() => setActiveTab("logs")}>{translations.logs}</a>
        </li>
        <li className={activeTab === "output" ? "uk-active" : ""}>
          <a onClick={() => setActiveTab("output")}>{translations.output}</a>
        </li>
        <li className={activeTab === "variables" ? "uk-active" : ""}>
          <a onClick={() => setActiveTab("variables")}>{translations.variables}</a>
        </li>
        <li className={activeTab === "constraints" ? "uk-active" : ""}>
          <a onClick={() => setActiveTab("constraints")}>{translations.constraints}</a>
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
