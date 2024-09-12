import React, { useState } from 'react';

var glpk = require('../dist/glpk.min.js');

const GlpkSolver = () => {
    const [inputData, setInputData] = useState("");
    const [outputData, setOutputData] = useState(null);
    const [inputFormat, setInputFormat] = useState("GMPL");

    var exampleProblem = `set I;
                          set J;
                          param a{i in I};
                          param b{j in J};
                          param d{i in I, j in J};
                          param f;
                          param c{i in I, j in J} := f * d[i,j] / 1000;
                          var x{i in I, j in J} >= 0;
                          minimize cost: sum{i in I, j in J} c[i,j] * x[i,j];
                          s.t. supply{i in I}: sum{j in J} x[i,j] <= a[i];
                          s.t. demand{j in J}: sum{i in I} x[i,j] >= b[j];
                          data;
                          set I := Seattle San-Diego;
                          set J := New-York Chicago Topeka;
                          param a := Seattle     350
                                     San-Diego   600;
                          param b := New-York    325
                                     Chicago     300
                                     Topeka      275;
                          param d :              New-York   Chicago   Topeka :=
                                     Seattle     2.5        1.7       1.8
                                     San-Diego   2.5        1.8       1.4;
                          param f := 90;
                          end;`;

    const solveGmplProblem = (problem) => {

        var tran = glpk.glp_mpl_alloc_wksp();
        var pos = 0;

        glpk.glp_mpl_read_model(tran, null,
            function () {
                if (pos < problem.length) {
                    return problem[pos++];
                } else
                    return -1;
            },
        )

        var lp = glpk.glp_create_prob();
        glpk.glp_mpl_generate(tran, null, console.log);
        glpk.glp_mpl_build_prob(tran, lp);
        glpk.glp_scale_prob(lp);
        var smcp = new glpk.SMCP({ presolve: glpk.GLP_ON });

        glpk.glp_simplex(lp, smcp);

        var iocp = new glpk.IOCP({ presolve: glpk.GLP_ON });

        glpk.glp_intopt(lp, iocp);
        glpk.glp_mpl_postsolve(tran, lp, glpk.GLP_MIP);

        //Mögliche Output Werte von GLPK-Solver
        console.log("obj: " + glpk.glp_mip_obj_val(lp));
        for (var i = 1; i <= glpk.glp_get_num_cols(lp); i++) {
            console.log(glpk.glp_get_col_name(lp, i) + " = " + glpk.glp_mip_col_val(lp, i));
        }

        return glpk.glp_mip_obj_val(lp);
    }

    const solveLpProblem = (problem) => {

        var lp = glpk.glp_create_prob();

        var pos = 0;
        glpk.glp_read_lp(lp, null,
            function () {
                if (pos < problem.length) {
                    return problem[pos++];
                } else
                    return -1;
            }
        )
        var smcp = new glpk.SMCP({ presolve: glpk.GLP_ON });
        glpk.glp_simplex(lp, smcp);

        var iocp = new glpk.IOCP({ presolve: glpk.GLP_ON });
        glpk.glp_intopt(lp, iocp);


        //Mögliche Output Werte von GLPK-Solver
        console.log("obj: " + glpk.glp_mip_obj_val(lp));
        for (var i = 1; i <= glpk.glp_get_num_cols(lp); i++) {
            console.log(glpk.glp_get_col_name(lp, i) + " = " + glpk.glp_mip_col_val(lp, i));
        }

        return glpk.glp_mip_obj_val(lp);
    }

    const solveProblem = (problem) => {
        try {
var result;
            if (inputFormat === "GMPL") {
                result = solveGmplProblem(problem)
            }
            else {
                result = solveLpProblem(problem)
            }

            setOutputData(`Optimaler Wert: ${result}`);
        } catch (error) {
            setOutputData(`Fehler: ${error.message}`);
        }
    };

    return (
        <div className="solver-container">
            <h2>GLPK Solver</h2>
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
            <button className="solve-button" onClick={() => solveProblem(inputData)}>
                Problem lösen
            </button>

            {outputData && (
                <div className="output-container">
                    <h2>Ergebnis:</h2>
                    <pre className="output-data">{outputData}</pre>
                </div>
            )}
        </div>
    );
};

export default GlpkSolver;
