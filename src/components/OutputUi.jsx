import React, { useState, useContext } from "react";
import "uikit/dist/css/uikit.min.css";
import { LanguageContext } from "../context/LanguageContext"; // Import the LanguageContext for translations

// Component to display the output UI with various tabs for summary, logs, output, variables, and constraints
const OutputUi = ({ outputData }) => {
  // Get the translations from the context
  const { translations } = useContext(LanguageContext);

  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState("summary");

  // Function to render the summary tab content
  const renderSummary = () => {
    // If there is no output data, display a message
    if (!outputData) return <p>{translations.noDataAvailable}</p>;

    // Render the summary details with status, objective value, and walltime
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

  // Function to render the logs tab content
  const renderLog = () => {
    // Display message if no output data or logs are not available/supported
    if (!outputData) return <p>{translations.noLogsAvailable}</p>;
    if (!outputData.hasOwnProperty("GlpkLog"))
      return <p>{translations.logsNotSupported}</p>;

    // Render the log details
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <pre>{outputData.GlpkLog}</pre>
      </div>
    );
  };

  // Function to render the output tab content
  const renderOutput = () => {
    // Display message if no output data or output is not supported
    if (!outputData) return <p>{translations.noOutputAvailable}</p>;
    if (!outputData.hasOwnProperty("GlpkOutput"))
      return <p>{translations.outputNotSupported}</p>;
    if (!outputData.GlpkOutput || outputData.GlpkOutput?.trim().length === 0)
      return <p>{translations.modelGeneratesNoOutput}</p>;

    // Render the output details
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <pre>{outputData.GlpkOutput}</pre>
      </div>
    );
  };

  // Function to render the variables tab content
  const renderVariables = () => {
    // Display message if no variables are available
    if (!outputData?.Columns) return <p>{translations.noVariablesAvailable}</p>;

    // Render a table of variables with their properties, wrapped in a scrollable div
    return (
      <div
        style={{ marginTop: "20px", textAlign: "center", overflowX: "auto" }}
      >
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
                <td className="uk-text-center">
                  {variable.Lower === null || variable.Lower === -Infinity
                    ? "-∞"
                    : variable.Lower}
                </td>
                <td className="uk-text-center">
                  {variable.Upper === null || variable.Upper === Infinity
                    ? "∞"
                    : variable.Upper}
                </td>
                <td className="uk-text-center">{variable.Dual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Function to render the constraints tab content
  const renderConstraints = () => {
    // Display message if no constraints are available
    if (!outputData?.Rows) return <p>{translations.noConstraintsAvailable}</p>;

    // Render a table of constraints with their properties, wrapped in a scrollable div
    return (
      <div
        style={{ marginTop: "20px", textAlign: "center", overflowX: "auto" }}
      >
        <table className="uk-table uk-table-divider uk-table-hover">
          <thead>
            <tr>
              <th className="uk-text-center">{translations.constraint}</th>
              <th className="uk-text-center">{translations.primalValue}</th>
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
                <td className="uk-text-center">
                  {row.Lower === null || row.Lower === -Infinity
                    ? "-∞"
                    : row.Lower}
                </td>
                <td className="uk-text-center">
                  {row.Upper === null || row.Upper === Infinity
                    ? "∞"
                    : row.Upper}
                </td>
                <td className="uk-text-center">{row.Dual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Main render function for the component
  return (
    <div className="uk-container uk-margin-top">
      {/* UIkit Tabs for navigation between different sections */}
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