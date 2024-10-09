export const SolverOptions = Object.freeze({
  GLPK: "GLPK",
  HIGHS: "HIGHS",
});

export const InputOptions = Object.freeze({
  LP: "LP",
  GMPL: "GMPL",
});

const highs_settings = {
  locateFile: (file) => "https://lovasoa.github.io/highs-js/" + file,
};
const highs_promise = require("highs")(highs_settings);

let glpk = require("../dist/glpk.min.js");

export const solve = async (problem, inputFormat, solver) => {
  console.log(
    "Solver:" +
      solver +
      "\n\nInputFormat:" +
      inputFormat +
      "\n\nProblem:" +
      problem,
  );
  const startTime = performance.now();
  var result;
  switch (solver) {
    case SolverOptions.GLPK:
      if (inputFormat === InputOptions.GMPL) {
        result = solveGmplProblemWithGlpk(problem);
      } else if (inputFormat === InputOptions.LP) {
        problem = formatGlpkInput(problem)
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
  const endTime = performance.now();
  result["Walltime"] = (endTime - startTime) / 1000;
  console.log(JSON.stringify(result, null, 2));
  return result;
};

const convertGmplToLp = (str) => {
  let result = "";
  let lp = glpk.glp_create_prob();
  let tran = glpk.glp_mpl_alloc_wksp();
  glpk._glp_mpl_init_rand(tran, 1);
  let pos = 0;

  glpk.glp_mpl_read_model(tran, null, function () {
    if (pos < str.length) {
      return str[pos++];
    } else return -1;
  });

  glpk.glp_mpl_generate(tran, null, console.log);
  glpk.glp_mpl_build_prob(tran, lp);

  glpk.glp_write_lp(lp, null, function (str) {
    result += str + `\n`;
  });

  return result;
};

const solveGmplProblemWithGlpk = (problem) => {
  var glpkOutput = "";
  var glpkLog = "";
  glpk.glp_set_print_func(function (data) {
    glpkLog += data + "\n";
  });
  let tran = glpk.glp_mpl_alloc_wksp();
  let pos = 0;

  glpk.glp_mpl_read_model(tran, null, function () {
    if (pos < problem.length) {
      return problem[pos++];
    } else return -1;
  });

  let lp = glpk.glp_create_prob();
  //"model" is the model name in logs
  glpk.glp_mpl_generate(tran, "model", function (data) {
    glpkOutput += data + "\n";
  });
  glpk.glp_mpl_build_prob(tran, lp);
  glpk.glp_scale_prob(lp);
  let smcp = new glpk.SMCP({ presolve: glpk.GLP_ON });

  glpk.glp_simplex(lp, smcp);

  let iocp = new glpk.IOCP({ presolve: glpk.GLP_ON });

  glpk.glp_intopt(lp, iocp);
  glpk.glp_mpl_postsolve(tran, lp, glpk.GLP_MIP);

  return formatGlpkOutput(lp, glpkOutput, glpkLog);
};

const solveLpProblemWithGlpk = (problem) => {
  //Output is only supported with GMPL Problems
  var glpkOutput = "";
  var glpkLog = "";
  glpk.glp_set_print_func(function (data) {
    glpkLog += data + "\n";
  });

  let lp = glpk.glp_create_prob();

  let pos = 0;
  glpk.glp_read_lp(lp, null, function () {
    if (pos < problem.length) {
      return problem[pos++];
    } else return -1;
  });

  let smcp = new glpk.SMCP({ presolve: glpk.GLP_ON });
  glpk.glp_simplex(lp, smcp);

  let iocp = new glpk.IOCP({ presolve: glpk.GLP_ON });
  glpk.glp_intopt(lp, iocp);

  return formatGlpkOutput(lp, glpkOutput, glpkLog);
};

const formatGlpkInput = (input) => {
// List of all possible keywords in CPLEX/GLPK problem definitions
const keywords = [
  // Objectives
  "Maximize", "Minimize", "Objective",
  // Constraints
  "Subject To", "Such That", "St",
  // Variable Declarations
  "Bounds",
  "General", "Generals", "Gen", "Gens",
  "Integer", "Integers", "Int", "Ints",
  "Binary", "Binaries", "Bin", "Bins",
  "Semi-Continuous", "Semi", "Semis",
  // Special Ordered Sets
  "SOS", "SOS1", "SOS2",
  // End Statement
  "End"
];

// Erstellen eines Regex, um die Keywords zu erkennen (Case-Insensitive)
const regex = new RegExp('\\b(' + keywords.join('|') + ')\\b', 'gi');

// Teilt den Input-String in Abschnitte basierend auf den Keywords
const sections = input.split(regex);

let output = '';
for (let i = 0; i < sections.length; i++) {
  const section = sections[i].trim();
  if (keywords.map(k => k.toLowerCase()).includes(section.toLowerCase())) {
      // Fügt das Keyword zur Ausgabe hinzu
      output += section + '\n';
      // Nächster Abschnitt ist der Inhalt
      const content = sections[i + 1];
      i++; // Überspringt den Inhalt im nächsten Loop
      if (typeof content === 'string' && content.trim()) {
          const trimmedContent = content.trim();
          // Bestimmt den Sektionstyp und parst entsprechend
          if (["Subject To", "Such That", "St"].map(k => k.toLowerCase()).includes(section.toLowerCase())) {
              // Constraints
              // Annahme: Jede Restriktion beginnt mit optionalem Namen gefolgt von einem Doppelpunkt
              const lines = trimmedContent.split(/(?=\b\w+:)/g);
              for (const line of lines) {
                  if (line.trim()) {
                      output += '  ' + line.trim() + '\n';
                  }
              }
          } else if (section.toLowerCase() === 'bounds') {
              // Bounds
              // Annahme: Jede Bound ist eine separate Ungleichung
              const lines = trimmedContent.split(/(?<=\d)(?=\s*[a-zA-Z_])/g);
              for (const line of lines) {
                  if (line.trim()) {
                      output += '  ' + line.trim() + '\n';
                  }
              }
          } else if ([
              "General", "Generals", "Gen", "Gens",
              "Integer", "Integers", "Int", "Ints",
              "Binary", "Binaries", "Bin", "Bins",
              "Semi-Continuous", "Semi", "Semis"
          ].map(k => k.toLowerCase()).includes(section.toLowerCase())) {
              // Variablendeklarationen
              const variables = trimmedContent.split(/\s+/);
              for (const variable of variables) {
                  if (variable.trim()) {
                      output += '  ' + variable.trim() + '\n';
                  }
              }
          } else {
              // Andere Sektionen (z.B. Maximize, Minimize)
              output += '  ' + trimmedContent + '\n';
          }
      }
  }
}

// Return the formatted output string without trailing whitespace
console.log(output.trim())
  return output.trim();
}



const formatGlpkOutput = (lp, glpkOutput, glpkLog) => {
  var status;
  switch (glpk.glp_mip_status(lp)) {
    case glpk.GLP_OPT:
      status = "Optimal";
      break;
    case glpk.GLP_UNDEF:
      status = "Undefined";
      break;
    case glpk.GLP_INFEAS:
      status = "Infeasible";
      break;
    case glpk.GLP_NOFEAS:
      status = "No feasible";
      break;
    case glpk.GLP_FEAS:
      status = "Feasible";
      break;
    case glpk.GLP_UNBND:
      status = "Unbounded";
      break;
    default:
      status = "Unknown";
      break;
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
      default:
        colType = "Unknown";
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
    var dual = glpk.glp_get_col_dual(lp, i); // Dualwert der Spalte
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
      Index: i - 1, // Index beginnt bei 0
      Status: statusStr, // Status der Spalte
      Lower: lb, // Untere Schranke
      Upper: ub, // Obere Schranke
      Primal: primal, // Primalwert
      Dual: dual, // Dualwert
      Type: colType, // Typ der Spalte
      Name: colName, // Name der Spalte
    };
  }

  var rows = [];
  //j = 2 to skip objective function, similar to HIGHS Output
  for (var j = 1; j <= glpk.glp_get_num_rows(lp); j++) {
    var ubR = glpk.glp_get_row_ub(lp, j);
    if (ubR >= Number.MAX_VALUE) {
      ubR = null;
    }

    var lbR = glpk.glp_get_row_lb(lp, j);
    if (lbR <= -Number.MAX_VALUE) {
      lbR = null;
    }

    var primalR = glpk.glp_get_row_prim(lp, j); // Primalwert der Zeile
    var dualR = glpk.glp_get_row_dual(lp, j); // Dualwert der Zeile
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
      case glpk.GLP_NF:
        statusStrR = "NF"; // Nicht Basis, freie Variable
        break;
      case glpk.GLP_NS:
        statusStrR = "NS "; // Nicht Basis, festgesetzt
        break;
      default:
        statusStrR = "Unknown";
        break;
    }

    var rowName = glpk.glp_get_row_name(lp, j);

    rows.push({
      Index: j - 1, // Index beginnt bei 0
      Status: statusStrR, // Status der Zeile
      Lower: lbR, // Untere Schranke
      Upper: ubR, // Obere Schranke
      Primal: primalR, // Primalwert der Zeile
      Dual: dualR, // Dualwert der Zeile
      Name: rowName, // Name der Zeile (z.B. c1, c2)
    });
  }

  var objectiveValue = glpk.glp_mip_obj_val(lp);

  var result = {
    Status: status,
    Columns: columns,
    Rows: rows,
    ObjectiveValue: objectiveValue,
    GlpkOutput: glpkOutput,
    GlpkLog: glpkLog,
  };
  return result;
};
