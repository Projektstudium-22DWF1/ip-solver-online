import Chooser from "./Chooser";
import React from "react";
import { InputOptions } from "../../services/SolverInterface";

function InputFormatChooser({ inputFormat, setInputFormat }) {
  const inputOptions = [
    { value: InputOptions.GMPL, label: InputOptions.GMPL },
    { value: InputOptions.LP, label: InputOptions.LP },
  ];

  return (
    <Chooser
      options={inputOptions}
      onChange={setInputFormat}
      label="Input Format Options"
      value={inputFormat}
    />
  );
}

export default InputFormatChooser;
