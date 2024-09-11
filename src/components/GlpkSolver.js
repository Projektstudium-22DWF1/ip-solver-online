import React, { useState } from 'react';

var glpk = require('../dist/glpk.min.js');

const GlpkSolver = () => {
    const [inputData, setInputData] = useState("");
    const [outputData, setOutputData] = useState(null);

    const solveProblem = () => {
        try {
            var str = `param n > 0 integer;
                        param log2_n := log(n) / log(2);
                        param k := floor(log2_n);
                        param a{j in 1..n} := 2 ** (k + n + 1) + 2 ** (k + n + 1 - j) + 1;
                        param b := 0.5 * floor(sum{j in 1..n} a[j]);
                        var x{1..n} binary;
                        maximize obj: sum{j in 1..n} a[j] * x[j];
                        s.t. cap: sum{j in 1..n} a[j] * x[j] <= b;
                        data;
                        param n := 15;
                        end;`

            var tran = glpk.glp_mpl_alloc_wksp();
            var pos = 0;
            glpk.glp_mpl_read_model(tran, null,
                function () {
                    if (pos < str.length) {
                        return str[pos++];
                    } else
                        return -1;
                },
            )


            var lp = glpk.glp_create_prob();
            glpk.glp_mpl_generate(tran, null, console.log);
            glpk.glp_mpl_build_prob(tran, lp);
            glpk.glp_scale_prob(lp);
            var smcp = new glpk.SMCP({presolve: glpk.GLP_ON});

            glpk.glp_simplex(lp, smcp);
        
            var iocp = new glpk.IOCP({
                presolve: glpk.GLP_ON,
                cb_func: function(tree){
                    if (glpk.glp_ios_reason(tree) == glpk.GLP_IBINGO){
                        var objective = glpk.glp_mip_obj_val(glpk.glp_ios_get_prob(tree));
                        //console.log("@@@" + objective);
        
                    }
                }
            });
        
            glpk.glp_intopt(lp, iocp);
            glpk.glp_mpl_postsolve(tran, lp, glpk.GLP_MIP);
            console.log("obj: " + glpk.glp_mip_obj_val(lp));
            
            setOutputData("");
        } catch (error) {
            setOutputData(`Fehler: ${error.message}`);
        }
    };

    return (
        <div className="solver-container">
            <h2>Test</h2>
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
        </div>
    );
};

export default GlpkSolver;
