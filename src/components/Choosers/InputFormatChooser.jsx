import React, { useContext, useEffect } from "react";
import Chooser from "./Chooser";
import { InputOptions } from "../../services/SolverInterface";
import { LanguageContext } from "../../context/LanguageContext";

function InputFormatChooser({ inputFormat, setInputFormat, setProblem }) {
  const { translations } = useContext(LanguageContext);

  // Clears the problem whenever input format changes
  useEffect(() => {
    setProblem("");
  }, [inputFormat, setProblem]);

  // Defines input options for the dropdown
  const inputOptions = [
    { value: InputOptions.LP, label: InputOptions.LP },
    { value: InputOptions.GMPL, label: InputOptions.GMPL },
  ];

  // Renders the Chooser component with input options
  return (
    <Chooser
      options={inputOptions}
      onChange={setInputFormat}
      label={translations.inputFormatOptions}
      value={inputFormat}
    />
  );
}

export default InputFormatChooser;
