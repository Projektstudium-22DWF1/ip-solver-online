//enum for valid solver options
export const SolverOptions = Object.freeze({
  GLPK: "GLPK",
  HIGHS: "HIGHS",
});
//enum for vaild input options
export const InputOptions = Object.freeze({
  LP: "LP",
  GMPL: "GMPL",
});

//initialize highs solver
const highs_settings = {
  locateFile: (file) => "https://lovasoa.github.io/highs-js/" + file,
};
const highs_promise = require("highs")(highs_settings);

//initialize glpk solver
let glpk = require("../dist/glpk.min.js");

//main solve interface function
export const solve = async (problem, inputFormat, solver) => {
  console.log(
    "Solver:" +
      solver +
      "\n\nInputFormat:" +
      inputFormat +
      "\n\nProblem:" +
      problem,
  );
  //record walltime
  const startTime = performance.now();
  var result;
  //choosen solver
  switch (solver) {
    case SolverOptions.GLPK:
      //choosen input format
      if (inputFormat === InputOptions.GMPL) {
        result = solveGmplProblemWithGlpk(problem);
      } else if (inputFormat === InputOptions.LP) {
        problem = formatGlpkInput(problem);
        result = solveLpProblemWithGlpk(problem);
      }
      break;
    case SolverOptions.HIGHS:
      //choosen input format
      if (inputFormat === InputOptions.GMPL) {
        //Convert GMPL Problem to LP problem to make it readable for Highs
        problem = convertGmplToLp(problem);
      }
      //else solve it native
      const highs = await highs_promise;
      result = highs.solve(problem);
      break;
    default:
      console.log("Unknown solver.");
      break;
  }
  const endTime = performance.now();
  result["Walltime"] = (endTime - startTime) / 1000;
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
  //all valid CPLEX LP Keywords
  const keywords = [
    // Objectives
    "Maximize",
    "Minimize",
    // Constraints
    "Subject To",
    "Such That",
    "St",
    // Variable Declarations
    "Bounds",
    "General",
    "Generals",
    "Gen",
    "Gens",
    "Integer",
    "Integers",
    "Int",
    "Ints",
    "Binary",
    "Binaries",
    "Bin",
    "Bins",
    "Semi-Continuous",
    "Semi",
    "Semis",
    // Special Ordered Sets
    "SOS",
    "SOS1",
    "SOS2",
    // End Statement
    "End",
  ];

  //regex to detect Keywords
  const regex = new RegExp("\\b(" + keywords.join("|") + ")\\b", "gi");

  //split input string to keywords and content
  const sections = input.split(regex);

  let output = "";
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i].trim();
    if (keywords.map((k) => k.toLowerCase()).includes(section.toLowerCase())) {
      
      output += section + "\n";
      
      const content = sections[i + 1];
      i++; 
      if (typeof content === "string" && content.trim()) {
        const trimmedContent = content.trim();
        // parse Content by keyword
        if (
          ["Subject To", "Such That", "St"]
            .map((k) => k.toLowerCase())
            .includes(section.toLowerCase())
        ) {
          // Constraints
          // Regex to detect end of constraint (=/>=/<= + number)
          const constraintRegex = /(?:\b\w+\s*:\s*)?.+?[<>=]=?\s*-?\d+(\.\d+)?/g;
          const lines = trimmedContent.match(constraintRegex) || [];
          //newline for each constraint
          for (const line of lines) {
            if (line.trim()) {
              output += "  " + line.trim() + "\n";
            }
          }
        } else if (section.toLowerCase() === "bounds") {
          // Bounds
          // Regex to detect bounds
          const boundRegex = /.+?[<>=]=?\s*-?\d+(\.\d+)?/g;
          const lines = trimmedContent.match(boundRegex) || [];
          //newline for each bound
          for (const line of lines) {
            if (line.trim()) {
              output += "  " + line.trim() + "\n";
            }
          }
        } else if (
          [
            "General",
            "Generals",
            "Gen",
            "Gens",
            "Integer",
            "Integers",
            "Int",
            "Ints",
            "Binary",
            "Binaries",
            "Bin",
            "Bins",
            "Semi-Continuous",
            "Semi",
            "Semis",
          ]
            .map((k) => k.toLowerCase())
            .includes(section.toLowerCase())
        ) {
          // Variables
          // Regex to detect variables
          const variables = trimmedContent.split(/\s+/);
          //newline for each variable
          for (const variable of variables) {
            if (variable.trim()) {
              output += "  " + variable.trim() + "\n";
            }
          }
        } else {
          // Other sections (Maximize, Minimize) in newline
          output += "  " + trimmedContent + "\n";
        }
      }
    }
  }
  console.log(output.trim());
  return output.trim();
};

//function to format Glpk output to a javascript object, that is uniform to highs solver return value
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
      ub = null; //If upperbounds is infinity, set output to null
    }

    var lb = glpk.glp_get_col_lb(lp, i);
    if (lb <= -Number.MAX_VALUE) {
      lb = null; //If lowerbounds is infinity, set output to null
    }

    var primal = glpk.glp_get_col_prim(lp, i); // primal
    var dual = glpk.glp_get_col_dual(lp, i); // dual
    var colStatus = glpk.glp_get_col_stat(lp, i); // status
    var statusStr;

    // Setze den Status je nach Statuscode
    switch (colStatus) {
      case glpk.GLP_BS:
        statusStr = "BS"; // basis
        break;
      case glpk.GLP_NL:
        statusStr = "LB"; // lowerbounds
        break;
      case glpk.GLP_NU:
        statusStr = "UB"; // upperbounds
        break;
      default:
        statusStr = "Unknown"; 
        break;
    }

    //get variables names
    var colName = glpk.glp_get_col_name(lp, i);

    // add to variables object
    columns[colName] = {
      Index: i - 1, // start index at 0
      Status: statusStr, 
      Lower: lb, 
      Upper: ub, 
      Primal: primal, 
      Dual: dual, 
      Type: colType, 
      Name: colName, 
    };
  }

  var rows = [];
  for (var j = 1; j <= glpk.glp_get_num_rows(lp); j++) {
    var ubR = glpk.glp_get_row_ub(lp, j);
    if (ubR >= Number.MAX_VALUE) {
      ubR = null;
    }

    var lbR = glpk.glp_get_row_lb(lp, j);
    if (lbR <= -Number.MAX_VALUE) {
      lbR = null;
    }

    var primalR = glpk.glp_get_row_prim(lp, j); // primal
    var dualR = glpk.glp_get_row_dual(lp, j); // dual
    var statusR = glpk.glp_get_row_stat(lp, j); // status (unused)
    var statusStrR;

    switch (statusR) {
      case glpk.GLP_BS:
        statusStrR = "BS"; // basis
        break;
      case glpk.GLP_NL:
        statusStrR = "LB"; // lowerbounds
        break;
      case glpk.GLP_NU:
        statusStrR = "UB"; // ub
        break;
      case glpk.GLP_NF:
        statusStrR = "NF"; // free
        break;
      case glpk.GLP_NS:
        statusStrR = "NS "; // stuck
        break;
      default:
        statusStrR = "Unknown";
        break;
    }

    var rowName = glpk.glp_get_row_name(lp, j);

    rows.push({
      Index: j - 1, // start index at 0
      Status: statusStrR, //status
      Lower: lbR, // lowerbounds
      Upper: ubR, // upperbounds
      Primal: primalR, // primal
      Dual: dualR, // dual
      Name: rowName, // name
    });
  }

  var objectiveValue = glpk.glp_mip_obj_val(lp);

  //construct result object and return
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
