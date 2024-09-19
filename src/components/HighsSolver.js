import React, { useState } from 'react';
import View from './View';

const highs_settings = {
  locateFile: (file) => "https://lovasoa.github.io/highs-js/" + file,
};
const highs_promise = require("highs")(highs_settings);

let glpk = require('../dist/glpk.min.js');

const convertInput = (str, format) => {
  console.log(format);
  if (format === "GMPL") {
    return convertGmplToLp(str);
  } else {
    return str;
  }
};

const convertGmplToLp = (str) => {
  let result = "";
  let lp = glpk.glp_create_prob();
  let tran = glpk.glp_mpl_alloc_wksp();
  glpk._glp_mpl_init_rand(tran, 1);
  let pos = 0;

  glpk.glp_mpl_read_model(tran, null,
      function () {
        if (pos < str.length) {
          return str[pos++];
        } else {
          return -1;
        }
      },
  );

  glpk.glp_mpl_generate(tran, null, console.log);
  glpk.glp_mpl_build_prob(tran, lp);

  glpk.glp_write_lp(lp, null, function(str) {
    result += str + `\n`;
  });

  return result;
};

// Schritt 1 & 2: `solveProblem` Funktion außerhalb der Komponente und exportieren
export const solveProblem = async (string, inputFormat) => {
  try {
    let input = convertInput(string, inputFormat);
    const highs = await highs_promise;
    const result = highs.solve(input);

    return JSON.stringify(result, null, 2);
  } catch (error) {
    throw new Error(`Fehler: ${error.message}`);
  }
};

// Schritt 3: Komponente `HighsSolver` anpassen
const HighsSolver = () => {
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState(null);
  const [inputFormat, setInputFormat] = useState("GMPL");

  // Aufruf der `solveProblem` Funktion
  const handleSolveProblem = async () => {
    try {

      const result = await solveProblem(inputData, inputFormat);
      setOutputData(result);
    } catch (error) {
      setOutputData(error.message);
    }
  };

  return (
      <View
          inputFormat={inputFormat}
          setInputFormat={setInputFormat}
          inputData={inputData}
          setInputData={setInputData}
          solveProblem={handleSolveProblem} // Verwende `handleSolveProblem` hier
          outputData={outputData}
      />
  );
};

export default HighsSolver;
