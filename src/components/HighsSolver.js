import React, { useState } from 'react';

const highs_settings = {
  locateFile: (file) => "https://lovasoa.github.io/highs-js/" + file,
};
const highs_promise = require("highs")(highs_settings);

var glpk = require('../dist/glpk.min.js');

const convertInput = (str, format) => {
  if (format === "GMPL") {
    return convertGmplToLp(str);
  } else {
    return str;
  }
}

const convertGmplToLp = (str) => {
  let result = "";
  var lp = glpk.glp_create_prob();
  var tran = glpk.glp_mpl_alloc_wksp();
  glpk._glp_mpl_init_rand(tran, 1);
  var pos = 0;

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
      var input = convertInput(inputData, inputFormat);
      console.log(input);
      const highs = await highs_promise;
      const result = highs.solve(input);
      setOutputData(JSON.stringify(result, null, 2));
    } catch (error) {
      setOutputData(`Fehler: ${error.message}`);
    }
  };

  return (
    <div className="solver-container">
      <h2>HIGHS Solver</h2>
      <div>
        <label>Input Format:</label>
        <select value={inputFormat} onChange={(e) => setInputFormat(e.target.value)}>
          <option value="GMPL">GMPL</option>
          <option value="LP">LP</option>
        </select>
      </div>
      <textarea
        className="input-textarea"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Gib dein Optimierungsproblem hier ein..."
      />
      <button className="solve-button" onClick={solveProblem}>Problem lösen</button>

      {outputData && (
        <div className="output-container">
          <h2>Ergebnis:</h2>
          <pre className="output-data">{outputData}</pre>
        </div>
      )}
      <h3>Beispiel:</h3>
      <pre>
        Maximize
        obj:
        x1 + 2 x2 + 4 x3 + x4
        Subject To
        c1: - x1 + x2 + x3 + 10 x4 &lt;= 20
        c2: x1 - 4 x2 + x3 &lt;= 30
        c3: x2 - 0.5 x4 = 0
        Bounds
        0 &lt;= x1 &lt;= 40
        2 &lt;= x4 &lt;= 3
        End
      </pre>
    </div>
  );
};

export default HighsSolver;
