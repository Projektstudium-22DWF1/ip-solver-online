export const SolverOptions = Object.freeze({
    GLPK: "GLPK",
    HIGHS: "HIGHS"
});

export const InputOptions = Object.freeze({
    LP: "LP",
    GMPL: "GMPL"
});

const highs_settings = {
    locateFile: (file) => "https://lovasoa.github.io/highs-js/" + file,
};
const highs_promise = require("highs")(highs_settings);

let glpk = require('../dist/glpk.min.js');

// Used in other components
// eslint-disable-next-line no-unused-vars 
export const solve = async (problem, inputFormat, solver) => {
    var result;
    switch (solver) {
        case SolverOptions.GLPK:
            if (inputFormat === InputOptions.GMPL) {
                result = solveGmplProblemWithGlpk(problem);
            }
            else if (inputFormat === InputOptions.LP) {
                result = solveLpProblemWithGlpk(problem);
            }

            break;
        case SolverOptions.HIGHS:
            if (inputFormat === InputOptions.GMPL) {
                problem = convertGmplToLp(problem);
            }
            const highs = await highs_promise;
            result = highs.solve(problem);
            break;
        default:
            console.log("Unknown solver.");
            break;
    }
    return result;
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
            } else
                return -1;
        },
    )

    glpk.glp_mpl_generate(tran, null, console.log);
    glpk.glp_mpl_build_prob(tran, lp);

    glpk.glp_write_lp(lp, null, function (str) {
        result += str + `\n`;
    });

    return result;
}

const solveGmplProblemWithGlpk = (problem) => {
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


    return formatGlpkData(lp);
};

const solveLpProblemWithGlpk = (problem) => {
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

    return formatGlpkData(lp)
};


const formatGlpkData = (lp) => {

    var status;
    switch (glpk.glp_mip_status(lp)) {
        case glpk.GLP_OPT: status = "Optimal"; break;
        case glpk.GLP_UNDEF: status = "Undefined"; break;
        case glpk.GLP_INFEAS: status = "Infeasible"; break;
        case glpk.GLP_NOFEAS: status = "No feasible"; break;
        case glpk.GLP_FEAS: status = "Feasible"; break;
        case glpk.GLP_UNBND: status = "Unbounded"; break;
        default: status = "Unknown"; break;

    }

    var columns = {};
    for (var i = 1; i <= glpk.glp_get_num_cols(lp); i++) {
        var colType;
        switch (glpk.glp_get_col_kind(lp, i)) {
            case glpk.GLP_CV:
                colType = "Continuous";
                break;
            case glpk.GLP_IV:
                colType = "Integer";
                break;
            case glpk.GLP_BV:
                colType = "Binary";
                break;
            default: colType = "Unknown"
                break;
        }

        var ub = glpk.glp_get_col_ub(lp, i);
        if (ub >= Number.MAX_VALUE) {
            ub = null;
        }

        var lb = glpk.glp_get_col_lb(lp, i);
        if (lb <= -Number.MAX_VALUE) {
            lb = null;
        }

        var primal = glpk.glp_get_col_prim(lp, i); // Primalwert der Spalte
        var dual = glpk.glp_get_col_dual(lp, i);   // Dualwert der Spalte
        var colStatus = glpk.glp_get_col_stat(lp, i); // Status der Spalte
        var statusStr;

        // Setze den Status je nach Statuscode
        switch (colStatus) {
            case glpk.GLP_BS:
                statusStr = "BS"; // Basis
                break;
            case glpk.GLP_NL:
                statusStr = "LB"; // Nicht Basis, untere Schranke
                break;
            case glpk.GLP_NU:
                statusStr = "UB"; // Nicht Basis, obere Schranke
                break;
            default:
                statusStr = "Unknown";
                break;
        }

        // Erstelle den Namen der Variablen (z.B. x1, x2, etc.)
        var colName = glpk.glp_get_col_name(lp, i);

        // Füge die Spalte zum 'columns'-Objekt hinzu
        columns[colName] = {
            Index: i - 1,         // Index beginnt bei 0
            Status: statusStr,    // Status der Spalte
            Lower: lb,            // Untere Schranke
            Upper: ub,            // Obere Schranke
            Primal: primal,       // Primalwert
            Dual: dual,           // Dualwert
            Type: colType,        // Typ der Spalte
            Name: colName         // Name der Spalte
        };
    }

    var rows = []; 
    /*
    for (var j = 1; j <= glpk.glp_get_num_rows(lp); j++) {
        var ubR = glpk.glp_get_row_ub(lp, j);
        if (ubR >= Number.MAX_VALUE) {
            ubR = "+inf";
        }

        var lbR = glpk.glp_get_row_lb(lp, j);
        if (lbR <= -Number.MAX_VALUE) {
            lbR = "-inf";
        }

        var primalR = glpk.glp_get_row_prim(lp, j); // Primalwert der Zeile
        var dualR = glpk.glp_get_row_dual(lp, j);   // Dualwert der Zeile
        var statusR = glpk.glp_get_row_stat(lp, j); // Status der Zeile
        var statusStrR;

        // Setze den Status je nach Statuscode
        switch (statusR) {
            case glpk.GLP_BS:
                statusStrR = "BS"; // Basis
                break;
            case glpk.GLP_NL:
                statusStrR = "LB"; // Nicht Basis, untere Schranke
                break;
            case glpk.GLP_NU:
                statusStrR = "UB"; // Nicht Basis, obere Schranke
                break;
            case glpk.GLP_LB:
                statusStrR = "LB"; // Untere Schranke aktiv
                break;
            case glpk.GLP_UB:
                statusStrR = "UB"; // Obere Schranke aktiv
                break;
            default:
                statusStrR = "Unknown";
                break;
        }

        // Erstelle den Namen der Zeile (z.B. c1, c2, etc.)
        var rowName = glpk.glp_get_row_name(lp, j);

        // Füge die Zeile (Constraint) zum 'rows'-Array hinzu
        rows.push({
            Index: j - 1,         // Index beginnt bei 0
            Status: statusStrR,    // Status der Zeile
            Lower: lb !== "-inf" ? lb : null,  // Untere Schranke (null, wenn -inf)
            Upper: ub !== "+inf" ? ub : null,  // Obere Schranke (null, wenn +inf)
            Primal: primalR,       // Primalwert der Zeile
            Dual: dualR,           // Dualwert der Zeile
            Name: rowName         // Name der Zeile (z.B. c1, c2)
        });
    } */

    var objectiveValue = glpk.glp_mip_obj_val(lp);

    var result = {
        Status: status,
        Columns: columns,
        Rows: rows,
        ObjectiveValue: objectiveValue
    };

    return result;
}