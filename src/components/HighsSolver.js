import React, { useState } from 'react';
import View from './View';

const highs_settings = {
  locateFile: (file) => "https://lovasoa.github.io/highs-js/" + file,
};
const highs_promise = require("highs")(highs_settings);

let glpk = require('../dist/glpk.min.js');

const convertInput = (str, format) => {
  if (format === "GMPL") {
    return convertGmplToLp(str);
  } else {
    return str;
  }
}

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
      } else
        return -1;
    },
  )

  glpk.glp_mpl_generate(tran, null, console.log);
  glpk.glp_mpl_build_prob(tran, lp);
  
  glpk.glp_write_lp(lp, null, function(str) {
    result += str + `\n`;});

  return result;
}

const HighsSolver = () => {
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState(null);
  const [inputFormat, setInputFormat] = useState("GMPL");

  const solveProblem = async () => {
    try {
      let input = convertInput(inputData, inputFormat);
      console.log(input);
      const highs = await highs_promise;
      const result = highs.solve(input);
      setOutputData(JSON.stringify(result, null, 2));
    } catch (error) {
      setOutputData(`Fehler: ${error.message}`);
    }
  };

  return (
      <View
          inputFormat={inputFormat}
          setInputFormat={setInputFormat}
          inputData={inputData}
          setInputData={setInputData}
          solveProblem={solveProblem}
          outputData={outputData}
      />
  );
};

export default HighsSolver;
