import React, { useState } from 'react';
import View from './View';  // Importiere die View-Komponente
let glpk = require('../dist/glpk.min.js');

const GlpkSolver = () => {
    const [inputData, setInputData] = useState("");
    const [outputData, setOutputData] = useState(null);
    const [inputFormat, setInputFormat] = useState("GMPL");

    // console.log(inputData);
    // console.log(outputData);
    // console.log(inputFormat);

    // GLPK GMPL-Problem
    const solveGmplProblem = (problem) => {
        console.log("GMPL Syntax: " + problem);
        let tran = glpk.glp_mpl_alloc_wksp();
        let pos = 0;

        glpk.glp_mpl_read_model(tran, null,
            function () {
                if (pos < problem.length) {
                    return problem[pos++];
                } else
                    return -1;
            },
        );

        let lp = glpk.glp_create_prob();
        glpk.glp_mpl_generate(tran, null, console.log);
        glpk.glp_mpl_build_prob(tran, lp);
        glpk.glp_scale_prob(lp);
        let smcp = new glpk.SMCP({ presolve: glpk.GLP_ON });

        glpk.glp_simplex(lp, smcp);

        let iocp = new glpk.IOCP({ presolve: glpk.GLP_ON });

        glpk.glp_intopt(lp, iocp);
        glpk.glp_mpl_postsolve(tran, lp, glpk.GLP_MIP);

        // Ergebnisse sammeln
        let results = [];

        // Zielfunktionswert
        results.push("Zielfunktionswert: " + glpk.glp_mip_obj_val(lp));

        // Werte der Entscheidungsvariablen //TODO auslagern
        for (let i = 1; i <= glpk.glp_get_num_cols(lp); i++) {
            results.push(glpk.glp_get_col_name(lp, i) + " = " + glpk.glp_mip_col_val(lp, i));
        }

        // Dualvariablen (Schattenpreise)
        for (let i = 1; i <= glpk.glp_get_num_rows(lp); i++) {
            results.push("Schattenpreis für " + glpk.glp_get_row_name(lp, i) + " = " + glpk.glp_get_row_dual(lp, i));
        }

        // Aktivitätswerte der Constraints
        for (let i = 1; i <= glpk.glp_get_num_rows(lp); i++) {
            results.push("Aktivitätswert für " + glpk.glp_get_row_name(lp, i) + " = " + glpk.glp_get_row_prim(lp, i));
        }

        // Ergebnisse ausgeben
        console.log(results.join('\n'));

        // Für die Ausgabe zurückgeben
        return results.join('\n');
    };


    // GLPK LP-Problem
    const solveLpProblem = (problem) => {
        console.log("LP Syntax: " + problem);

        let lp = glpk.glp_create_prob();

        let pos = 0;
        glpk.glp_read_lp(lp, null,
            function () {
                if (pos < problem.length) {
                    return problem[pos++];
                } else
                    return -1;
            }
        );

        let smcp = new glpk.SMCP({ presolve: glpk.GLP_ON });
        glpk.glp_simplex(lp, smcp);

        let iocp = new glpk.IOCP({ presolve: glpk.GLP_ON });
        glpk.glp_intopt(lp, iocp);

        // Ergebnis-Parameter sammeln
        let results = [];

        // Zielfunktionswert
        results.push("Zielfunktionswert: " + glpk.glp_mip_obj_val(lp)); //TODO auslagern

        // Entscheidungsvariablen-Werte
        for (let i = 1; i <= glpk.glp_get_num_cols(lp); i++) {
            results.push(glpk.glp_get_col_name(lp, i) + " = " + glpk.glp_mip_col_val(lp, i));
        }

        // Dualvariablen (Schattenpreise)
        for (let i = 1; i <= glpk.glp_get_num_rows(lp); i++) {
            results.push("Schattenpreis für " + glpk.glp_get_row_name(lp, i) + " = " + glpk.glp_get_row_dual(lp, i));
        }

        // Ergebnisse ausgeben
        console.log(results.join('\n'));

        return results.join('\n');
    };


    // Logik für die Problem-Lösung
    const solveProblem = (problem) => {
        try {
            let result = "";
            if (inputFormat === "GMPL") {
                result = solveGmplProblem(problem);
            } else {
                result = solveLpProblem(problem);
            }
            setOutputData(`Optimaler Wert: ${result}`);
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
            solveProblem={() => solveProblem(inputData)}
            outputData={outputData}
        />
    );
};
export default GlpkSolver;
