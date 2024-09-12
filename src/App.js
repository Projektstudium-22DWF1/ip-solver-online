import './App.css';
import React, { useState } from 'react';
import HighsSolver from './components/HighsSolver';
import GlpkSolver from './components/GlpkSolver';

function App() {
  // Zustand für die Auswahl der Komponente
  const [solver, setSolver] = useState('highs');

  // Funktion zum Ändern der ausgewählten Komponente
  const handleSolverChange = (event) => {
    setSolver(event.target.value);
  };

  return (
    <div className="App">
      <h1>LP Solver</h1>
      <select onChange={handleSolverChange} value={solver}>
        <option value="highs">HiGHS Solver</option>
        <option value="glpk">GLPK Solver</option>
      </select>
      {solver === 'highs' ? <HighsSolver /> : <GlpkSolver />}
    </div>
  );
}

export default App;
