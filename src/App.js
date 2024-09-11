import './App.css';
import React from 'react';
import HighsSolver from './components/HighsSolver';
import GlpkSolver from './components/GlpkSolver';

function App() {
  return (
    <div className="App">
      <h1>LP Solver</h1>
      <HighsSolver />
    </div>
  );
}

export default App;
