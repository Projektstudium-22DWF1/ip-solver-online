import React from "react";
import 'uikit/dist/css/uikit.min.css';

export function EinfacheProbleme() {


    return (
        <React.Fragment>
            <div>
                Test
            </div>

        </React.Fragment>
    );
}



// import React, { useState } from 'react';
//
// const highs_settings = {
//     locateFile: (file) => "https://lovasoa.github.io/highs-js/" + file,
// };
// const highs_promise = require("highs")(highs_settings);
//
// const HighsSolver = () => {
//     const [objectiveType, setObjectiveType] = useState("Maximize");
//     const [objectiveFunction, setObjectiveFunction] = useState("");
//     const [objectiveIndex, setObjectiveIndex] = useState("obj");
//     const [constraints, setConstraints] = useState([{ name: "c0", equation: "" }]);
//     const [bounds, setBounds] = useState([{ equation: "" }]);
//     const [outputData, setOutputData] = useState(null);
//     const [fullProblem, setFullProblem] = useState(""); // State for full problem input
//
//     const addConstraint = () => {
//         setConstraints([...constraints, { name: `c${constraints.length}`, equation: "" }]);
//     };
//
//     const addBound = () => {
//         setBounds([...bounds, { equation: "" }]);
//     };
//
//     const updateConstraint = (index, key, value) => {
//         const newConstraints = [...constraints];
//         newConstraints[index][key] = value;
//         setConstraints(newConstraints);
//     };
//
//     const updateBound = (index, value) => {
//         const newBounds = [...bounds];
//         newBounds[index].equation = value;
//         setBounds(newBounds);
//     };
//
//     const removeConstraint = (index) => {
//         const newConstraints = constraints.filter((_, i) => i !== index);
//         setConstraints(newConstraints);
//     };
//
//     const removeBound = (index) => {
//         const newBounds = bounds.filter((_, i) => i !== index);
//         setBounds(newBounds);
//     };
//
//     const solveProblem = async () => {
//         try {
//             const highs = await highs_promise;
//
//             const fullInputData = `${objectiveType} ${objectiveIndex}:\n  ${objectiveFunction}\nSubject To\n${constraints
//                 .filter((constraint) => constraint.equation.trim() !== "")
//                 .map((constraint) => `${constraint.name}: ${constraint.equation.replace("=", "=")}`)
//                 .join("\n")}\nBounds\n${bounds
//                 .filter((bound) => bound.equation.trim() !== "")
//                 .map((bound) => `${bound.equation}`)
//                 .join("\n")}\nEnd`;
//
//             console.log("Full Input Data:", fullInputData);
//
//             const result = highs.solve(fullInputData);
//
//             setOutputData(JSON.stringify(result, null, 2));
//         } catch (error) {
//             setOutputData(`Fehler: ${error.message}`);
//         }
//     };
//
//     // Funktion zum Lösen des Problems mit manuell eingegebenem LP-Format
//     const solveFullProblem = async () => {
//         try {
//             const highs = await highs_promise;
//
//             console.log("Full Problem Input:", fullProblem);
//
//             const result = highs.solve(fullProblem);
//
//             setOutputData(JSON.stringify(result, null, 2));
//         } catch (error) {
//             setOutputData(`Fehler: ${error.message}`);
//         }
//     };
//
//     return (
//         <div className="solver-container">
//             <h2>HIGHS Solver</h2>
//
//             {/* Standardfelder für Zielfunktion und Constraints */}
//             <div className="objective-type-container" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//                 <select
//                     id="objective-type"
//                     value={objectiveType}
//                     onChange={(e) => setObjectiveType(e.target.value)}
//                     style={{ marginRight: '10px' }}
//                 >
//                     <option value="Maximize">Maximize</option>
//                     <option value="Minimize">Minimize</option>
//                 </select>
//
//                 <input
//                     type="text"
//                     value={objectiveIndex}
//                     onChange={(e) => setObjectiveIndex(e.target.value)}
//                     placeholder="Zielfunktionsindex"
//                     style={{ width: '80px', marginRight: '10px' }}
//                 />
//
//                 <textarea
//                     id="objective-function"
//                     className="input-textarea"
//                     value={objectiveFunction}
//                     onChange={(e) => setObjectiveFunction(e.target.value)}
//                     placeholder="Function..."
//                     style={{ flexGrow: 1 }}
//                 />
//             </div>
//
//             {constraints.map((constraint, index) => (
//                 <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
//                     <input
//                         type="text"
//                         value={constraint.name}
//                         onChange={(e) => updateConstraint(index, "name", e.target.value)}
//                         placeholder="Name"
//                         style={{ width: '60px', marginRight: '5px' }}
//                     />
//                     <span style={{ marginRight: '10px' }}>:</span>
//                     <textarea
//                         id={`constraint-${index}`}
//                         className="input-textarea"
//                         value={constraint.equation}
//                         onChange={(e) => updateConstraint(index, "equation", e.target.value)}
//                         placeholder={`Constraint ${index + 1} ...`}
//                         style={{ flexGrow: 1, marginRight: '10px' }}
//                     />
//                     <button
//                         className="remove-constraint-button"
//                         onClick={() => removeConstraint(index)}
//                         style={{ color: 'red', border: 'none', background: 'transparent', cursor: 'pointer' }}
//                     >
//                         X
//                     </button>
//                 </div>
//             ))}
//             <button className="add-constraint-button" onClick={addConstraint}>
//                 + Add constraint
//             </button>
//
//             {bounds.map((bound, index) => (
//                 <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
//           <textarea
//               id={`bound-${index}`}
//               className="input-textarea"
//               value={bound.equation}
//               onChange={(e) => updateBound(index, e.target.value)}
//               placeholder={`Bound ${index + 1} ...`}
//               style={{ flexGrow: 1, marginRight: '10px' }}
//           />
//                     <button
//                         className="remove-bound-button"
//                         onClick={() => removeBound(index)}
//                         style={{ color: 'red', border: 'none', background: 'transparent', cursor: 'pointer' }}
//                     >
//                         X
//                     </button>
//                 </div>
//             ))}
//             <button className="add-bound-button" onClick={addBound}>
//                 + Add bound
//             </button>
//
//             <button className="solve-button" onClick={solveProblem} style={{ marginTop: '10px' }}>
//                 Solve problem
//             </button>
//
//             {/* Neuer Abschnitt für die Eingabe des gesamten Problems */}
//             <h3>Or enter the full problem:</h3>
//             <textarea
//                 id="full-problem-input"
//                 className="input-textarea"
//                 value={fullProblem}
//                 onChange={(e) => setFullProblem(e.target.value)}
//                 placeholder="Enter the full optimization problem in LP format..."
//                 style={{ width: '100%', height: '150px', marginBottom: '10px' }}
//             />
//             <button className="solve-full-button" onClick={solveFullProblem} style={{ marginBottom: '10px' }}>
//                 Solve full problem
//             </button>
//
//             {outputData && (
//                 <div className="output-container">
//                     <h2>Solution:</h2>
//                     <pre className="output-data">{outputData}</pre>
//                 </div>
//             )}
//
//             <h3>Example:</h3>
//             <pre>
//         Maximize
//         obj:
//         x1 + 2 x2 + 4 x3 + x4
//         Subject To
//         c1: - x1 + x2 + x3 + 10 x4 &lt;= 20
//         c2: x1 - 4 x2 + x3 &lt;= 30
//         c3: x2 - 0.5 x4 = 0
//         Bounds
//         0 &lt;= x1 &lt;= 40
//         2 &lt;= x4 &lt;= 3
//         End
//       </pre>
//         </div>
//     );
// };
//
// export default HighsSolver;
