import "./App.css";
import React from "react";
import { SolveExamples } from "./components/Tabs/SolveExamples";
import "uikit/dist/css/uikit.min.css";
import { MainNavbar } from "./components/Tabs/MainNavbar";
import { LanguageProvider } from "./context/LanguageContext"; // Importiere den LanguageProvider
import Footer from "./components/Footer"; // Importiere die neue Footer-Komponente

function App() {
  return (
    <LanguageProvider> {/* Umhülle die App mit LanguageProvider */}
      <div className={"all"}>
        <MainNavbar />
        
        {/* Zeigt die Beispiele in der Konsole an */}
        <SolveExamples />

        {/* Verwende die Footer-Komponente */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
