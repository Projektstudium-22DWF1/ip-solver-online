import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputFormatChooser from "./InputFormatChooser";
import { LanguageContext } from "../../context/LanguageContext";
import { InputOptions } from "../../services/SolverInterface";

// Mock glpk module to prevent ReferenceError during testing
jest.mock("../../dist/glpk.min.js", () => ({
  // Mock only the parts of glpk that might be used in InputFormatChooser
}));

describe("InputFormatChooser Component", () => {
  const mockTranslations = {
    inputFormatOptions: "Input Format",
  };
  const mockSetInputFormat = jest.fn();

  test("renders without crashing and displays correct label", () => {
    render(
      <LanguageContext.Provider value={{ translations: mockTranslations }}>
        <InputFormatChooser
          inputFormat={InputOptions.LP}
          setInputFormat={mockSetInputFormat}
        />
      </LanguageContext.Provider>,
    );

    // Überprüfe, ob das Label korrekt angezeigt wird
    expect(
      screen.getByLabelText(mockTranslations.inputFormatOptions),
    ).toBeInTheDocument();
  });

  test("renders correct options", () => {
    render(
      <LanguageContext.Provider value={{ translations: mockTranslations }}>
        <InputFormatChooser
          inputFormat={InputOptions.LP}
          setInputFormat={mockSetInputFormat}
        />
      </LanguageContext.Provider>,
    );

    // Öffne das Dropdown-Menü durch Klicken auf den Button
    fireEvent.click(screen.getByRole("button"));

    // Überprüfe, ob die Optionen vorhanden sind
    const selectElement = screen.getByLabelText(
      mockTranslations.inputFormatOptions,
    );
    expect(selectElement).toHaveTextContent(InputOptions.LP);
    expect(selectElement).toHaveTextContent(InputOptions.GMPL);
  });

  test("displays the correct initial value", () => {
    render(
      <LanguageContext.Provider value={{ translations: mockTranslations }}>
        <InputFormatChooser
          inputFormat={InputOptions.LP}
          setInputFormat={mockSetInputFormat}
        />
      </LanguageContext.Provider>,
    );

    // Überprüfe, ob der Button den richtigen initialen Wert anzeigt
    expect(screen.getByRole("button")).toHaveTextContent(InputOptions.LP);
  });

  test("calls setInputFormat when a new option is selected", () => {
    render(
      <LanguageContext.Provider value={{ translations: mockTranslations }}>
        <InputFormatChooser
          inputFormat={InputOptions.LP}
          setInputFormat={mockSetInputFormat}
        />
      </LanguageContext.Provider>,
    );

    // Öffne das Dropdown-Menü durch Klicken auf den Button
    fireEvent.click(screen.getByRole("button"));

    // Wähle eine neue Option im Dropdown-Menü aus
    fireEvent.change(
      screen.getByLabelText(mockTranslations.inputFormatOptions),
      {
        target: { value: InputOptions.GMPL },
      },
    );

    // Überprüfe, ob setInputFormat mit dem richtigen Wert aufgerufen wurde
    expect(mockSetInputFormat).toHaveBeenCalledWith(InputOptions.GMPL);
  });
});
