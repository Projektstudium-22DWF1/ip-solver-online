import React, { useContext } from "react";
import Chooser from "./Chooser";
import { InputOptions } from "../../services/SolverInterface";
import { LanguageContext } from "../../context/LanguageContext"; // Importiere den Kontext

function InputFormatChooser({ inputFormat, setInputFormat }) {
  const { translations } = useContext(LanguageContext); // Zugriff auf Übersetzungen

  const inputOptions = [
    { value: InputOptions.GMPL, label: InputOptions.GMPL },
    { value: InputOptions.LP, label: InputOptions.LP },
  ];

  return (
    <Chooser
      options={inputOptions}
      onChange={setInputFormat}
      label={translations.inputFormatOptions} // Verwende den übersetzten Text
      value={inputFormat}
    />
  );
}

export default InputFormatChooser;
