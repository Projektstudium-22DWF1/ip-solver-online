import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

function DescriptionTab() {
  // Use the LanguageContext to get the translations for the current language
  const { translations } = useContext(LanguageContext);

  // Inline styles for the container to handle layout on small and large screens
  const containerStyle = {
    maxWidth: "100%", // Ensures the container doesn't exceed the viewport width on small screens
    padding: "0 1rem", // Adds padding on the left and right to create space around the content
    boxSizing: "border-box", // Ensures that padding and borders are included in the element's width
    margin: "0 auto", // On larger screens, this centers the container horizontally
  };

  // Inline styles for the code blocks to ensure proper formatting and scrolling behavior
  const codeBlockStyle = {
    whiteSpace: "pre-wrap", // Allows text inside <pre> tags to wrap and avoid overflow
    wordWrap: "break-word", // Forces long words or code snippets to break if necessary
    overflowX: "auto", // Enables horizontal scrolling if the content is too wide for the container
  };

  return (
    <React.Fragment>
      <div style={containerStyle}>
        {/* Introduction Section */}
        <h1>{translations.optimizationTitle}</h1>{" "}
        {/* Title of the optimization section */}
        <p>{translations.optimizationIntro}</p>{" "}
        {/* Introduction text for optimization */}
        {/* Linear Optimization Section */}
        <h2>{translations.linearOptimizationTitle}</h2>{" "}
        {/* Subtitle for Linear Optimization */}
        <p>{translations.linearOptimizationDescription}</p>{" "}
        {/* Description of Linear Optimization */}
        <ul>
          <li>
            <strong>{translations.objectiveFunction}</strong>:{" "}
            {translations.objectiveFunctionDescription}
          </li>
          <li>
            <strong>{translations.constraints_description}</strong>:{" "}
            {translations.constraintsDescription}
          </li>
          <li>
            <strong>{translations.variables_description}</strong>:{" "}
            {translations.variablesDescription}
          </li>
        </ul>
        {/* HIGHS Solver Section */}
        <h2>{translations.highsTitle}</h2> {/* Subtitle for HIGHS Solver */}
        <p>{translations.highsDescription}</p>{" "}
        {/* Description of HIGHS Solver */}
        <ul>
          <li>{translations.highsFeature1}</li>{" "}
          {/* Feature of the HIGHS solver */}
          <li>{translations.highsFeature2}</li>{" "}
          {/* Feature of the HIGHS solver */}
          <li>{translations.highsFeature3}</li>{" "}
          {/* Feature of the HIGHS solver */}
        </ul>
        {/* GLPK Solver Section */}
        <h2>{translations.glpkTitle}</h2> {/* Subtitle for GLPK Solver */}
        <p>{translations.glpkDescription}</p> {/* Description of GLPK Solver */}
        <ul>
          <li>{translations.glpkFeature1}</li>{" "}
          {/* Feature of the GLPK solver */}
          <li>{translations.glpkFeature2}</li>{" "}
          {/* Feature of the GLPK solver */}
          <li>{translations.glpkFeature3}</li>{" "}
          {/* Feature of the GLPK solver */}
        </ul>
        {/* Input Languages Section */}
        <h2>{translations.inputLanguagesTitle}</h2>{" "}
        {/* Subtitle for Input Languages */}
        {/* LP Format Section */}
        <h3>{translations.lpFormatTitle}</h3> {/* Subtitle for LP format */}
        <p>{translations.lpFormatDescription}</p>{" "}
        {/* Description of the LP format */}
        <pre style={codeBlockStyle}>
          <code>
            {`Minimize
  obj: 3 x1 + 2 x2
Subject To
  c1: - x1 + x2 <= 1
  c2: x1 + x2 >= 2
Bounds
  0 <= x1 <= 10
  0 <= x2 <= 10
End`}
          </code>
        </pre>
        {/* GMPL Format Section */}
        <h3>{translations.gmplFormatTitle}</h3> {/* Subtitle for GMPL format */}
        <p>{translations.gmplFormatDescription}</p>{" "}
        {/* Description of the GMPL format */}
        <pre style={codeBlockStyle}>
          <code>
            {`param n;
set I;
var x{i in I} >= 0;
minimize obj: sum{i in I} c[i] * x[i];
subject to con{i in I}: sum{j in J} A[i,j] * x[j] >= b[i];`}
          </code>
        </pre>
        {/* Comparison Section */}
        <h2>{translations.comparisonTitle}</h2>{" "}
        {/* Subtitle for comparison section */}
        <p>{translations.comparisonDescription}</p>{" "}
        {/* Description of the comparison */}
        <ul>
          <li>
            <strong>{translations.comparisonFeature1Title}</strong>:{" "}
            {translations.comparisonFeature1Description}
          </li>
          <li>
            <strong>{translations.comparisonFeature2Title}</strong>:{" "}
            {translations.comparisonFeature2Description}
          </li>
          <li>
            <strong>{translations.comparisonFeature3Title}</strong>:{" "}
            {translations.comparisonFeature3Description}
          </li>
        </ul>
        {/* Resources Section */}
        <h2>{translations.resourcesTitle}</h2> {/* Subtitle for resources */}
        <ul>
          <li>
            <a
              href="https://highs.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              {translations.highsDocumentationLink}
            </a>
          </li>
          <li>
            <a
              href="https://www.gnu.org/software/glpk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {translations.glpkDocumentationLink}
            </a>
          </li>
          <li>
            <a
              href="https://gusek.sourceforge.net/gmpl.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              {translations.cplexDocumentationLink}
            </a>
          </li>
          <li>
            <a
              href="https://gusek.sourceforge.net/gmpl.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              {translations.gmplDocumentationLink}
            </a>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}

export default DescriptionTab;
