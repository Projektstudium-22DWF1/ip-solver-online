import React from 'react';

const View = ({ inputFormat, setInputFormat, inputData, setInputData, solveProblem, outputData }) => {
    return (
        <div className="solver-container">
            <h2>Solver</h2>
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
        </div>
    );
};

export default View;
