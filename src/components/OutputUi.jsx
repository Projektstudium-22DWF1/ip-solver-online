import React, { useState, useContext } from "react";
import "uikit/dist/css/uikit.min.css";
import { LanguageContext } from "../context/LanguageContext"; 

const OutputUi = ({ outputData }) => {
  const { translations } = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState("summary");

  // Render summary tab content
  const renderSummary = () => {
    if (!outputData) return <p>{translations.noDataAvailable}</p>;

    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>
          <strong>{translations.status}:</strong> {outputData.Status}
        </p>
        <p>
          <strong>{translations.objectiveValue}:</strong>{" "}
          {outputData.ObjectiveValue}
        </p>
        <p>
          <strong>{translations.walltime}:</strong> {outputData.Walltime}{" "}
          {translations.seconds}
        </p>
      </div>
    );
  };

  // Render logs tab content
  const renderLog = () => {
    if (!outputData || !outputData.hasOwnProperty("GlpkLog"))
      return <p>{translations.noLogsAvailable}</p>;

    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <pre>{outputData.GlpkLog}</pre>
      </div>
    );
  };

  // Render output tab content
  const renderOutput = () => {
    if (!outputData || !outputData.hasOwnProperty("GlpkOutput"))
      return <p>{translations.noOutputAvailable}</p>;

    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <pre>{outputData.GlpkOutput}</pre>
      </div>
    );
  };

  // Render variables tab with scroll if necessary
  const renderVariables = () => {
    if (!outputData?.Columns) return <p>{translations.noVariablesAvailable}</p>;

    return (
      <div style={{ marginTop: "20px", textAlign: "center", overflowX: "auto" }}>
        <table className="uk-table uk-table-divider uk-table-hover">
          <thead>
            <tr>
              <th>{translations.variable}</th>
              <th>{translations.primalValue}</th>
              <th>{translations.status}</th>
              <th>{translations.lowerBound}</th>
              <th>{translations.upperBound}</th>
              <th>{translations.dualValue}</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(outputData.Columns).map(([key, variable]) => (
              <tr key={key}>
                <td>{variable.Name}</td>
                <td>{variable.Primal}</td>
                <td>{variable.Status}</td>
                <td>{variable.Lower ?? "-∞"}</td>
                <td>{variable.Upper ?? "∞"}</td>
                <td>{variable.Dual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Render constraints tab with scroll if necessary
  const renderConstraints = () => {
    if (!outputData?.Rows) return <p>{translations.noConstraintsAvailable}</p>;

    return (
      <div style={{ marginTop: "20px", textAlign: "center", overflowX: "auto" }}>
        <table className="uk-table uk-table-divider uk-table-hover">
          <thead>
            <tr>
              <th>{translations.constraint}</th>
              <th>{translations.primalValue}</th>
              <th>{translations.lowerBound}</th>
              <th>{translations.upperBound}</th>
              <th>{translations.dualValue}</th>
            </tr>
          </thead>
          <tbody>
            {outputData.Rows.map((row, index) => (
              <tr key={index}>
                <td>{row.Name}</td>
                <td>{row.Primal}</td>
                <td>{row.Lower ?? "-∞"}</td>
                <td>{row.Upper ?? "∞"}</td>
                <td>{row.Dual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Main render for tabs and content
  return (
    <div className="uk-container uk-margin-top">
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
          <a onClick={() => setActiveTab("variables")}>
            {translations.variables}
          </a>
        </li>
        <li className={activeTab === "constraints" ? "uk-active" : ""}>
          <a onClick={() => setActiveTab("constraints")}>
            {translations.constraints}
          </a>
        </li>
      </ul>

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
