import "./App.css";
import React from "react";
import "uikit/dist/css/uikit.min.css";
import { MainNavbar } from "./components/Navigation/MainNavbar";
import { LanguageProvider } from "./context/LanguageContext";
import Footer from "./components/Footer"; 

function App() {
  return (
    <LanguageProvider>
      {/* Wrap the app with LanguageProvider to manage translations */}
      <div className={"all"}>
        <MainNavbar /> {/* Include the main navigation bar */}

        <Footer /> {/* Include the footer component */}
      </div>
    </LanguageProvider>
  );
}

export default App;
