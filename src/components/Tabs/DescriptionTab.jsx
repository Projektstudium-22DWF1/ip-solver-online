import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

function DescriptionTab() {
  const { translations } = useContext(LanguageContext);

  return (
    <React.Fragment>
      <div className="description-container">
        {/* Einleitung */}
        <h1>{translations.optimizationTitle}</h1>
        <p>{translations.optimizationIntro}</p>

        {/* Lineare Optimierung */}
        <h2>{translations.linearOptimizationTitle}</h2>
        <p>{translations.linearOptimizationDescription}</p>
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

        {/* HIGHS Solver */}
        <h2>{translations.highsTitle}</h2>
        <p>{translations.highsDescription}</p>
        <ul>
          <li>{translations.highsFeature1}</li>
          <li>{translations.highsFeature2}</li>
          <li>{translations.highsFeature3}</li>
        </ul>

        {/* GLPK Solver */}
        <h2>{translations.glpkTitle}</h2>
        <p>{translations.glpkDescription}</p>
        <ul>
          <li>{translations.glpkFeature1}</li>
          <li>{translations.glpkFeature2}</li>
          <li>{translations.glpkFeature3}</li>
        </ul>

        {/* Input Sprachen */}
        <h2>{translations.inputLanguagesTitle}</h2>

        {/* LP Format */}
        <h3>{translations.lpFormatTitle}</h3>
        <p>{translations.lpFormatDescription}</p>
        <pre>
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

        {/* GMPL Format */}
        <h3>{translations.gmplFormatTitle}</h3>
        <p>{translations.gmplFormatDescription}</p>
        <pre>
          <code>
            {`param n;
set I;
var x{i in I} >= 0;
minimize obj: sum{i in I} c[i] * x[i];
subject to con{i in I}: sum{j in J} A[i,j] * x[j] >= b[i];`}
          </code>
        </pre>

        {/* Vergleich */}
        <h2>{translations.comparisonTitle}</h2>
        <p>{translations.comparisonDescription}</p>
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

        {/* Ressourcen */}
        <h2>{translations.resourcesTitle}</h2>
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
