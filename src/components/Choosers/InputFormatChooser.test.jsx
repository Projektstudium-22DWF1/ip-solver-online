import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputFormatChooser from "./InputFormatChooser";
import { LanguageContext } from "../../context/LanguageContext";
import { InputOptions } from "../../services/SolverInterface";

// Mock glpk to prevent errors during testing
jest.mock("../../dist/glpk.min.js", () => ({}));

describe("InputFormatChooser Component", () => {
  const mockTranslations = {
    inputFormatOptions: "Input Format",
  };

  const mockSetInputFormat = jest.fn();
  const mockSetProblem = jest.fn(); // Mock für setProblem

  test("renders without crashing and displays correct label", () => {
    render(
      <LanguageContext.Provider value={{ translations: mockTranslations }}>
        <InputFormatChooser
          inputFormat={InputOptions.LP}
          setInputFormat={mockSetInputFormat}
          setProblem={mockSetProblem} // Hinzufügen der Mock-Funktion für setProblem
        />
      </LanguageContext.Provider>,
    );

    // Verifies the label is rendered correctly
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
          setProblem={mockSetProblem} // Hinzufügen der Mock-Funktion für setProblem
        />
      </LanguageContext.Provider>,
    );

    fireEvent.click(screen.getByRole("button"));

    // Verifies that both input options are rendered in the dropdown
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
          setProblem={mockSetProblem} // Hinzufügen der Mock-Funktion für setProblem
        />
      </LanguageContext.Provider>,
    );

    // Verifies the button shows the correct initial value
    expect(screen.getByRole("button")).toHaveTextContent(InputOptions.LP);
  });

  test("calls setInputFormat when a new option is selected", () => {
    render(
      <LanguageContext.Provider value={{ translations: mockTranslations }}>
        <InputFormatChooser
          inputFormat={InputOptions.LP}
          setInputFormat={mockSetInputFormat}
          setProblem={mockSetProblem} // Hinzufügen der Mock-Funktion für setProblem
        />
      </LanguageContext.Provider>,
    );

    fireEvent.click(screen.getByRole("button"));

    fireEvent.change(
      screen.getByLabelText(mockTranslations.inputFormatOptions),
      {
        target: { value: InputOptions.GMPL },
      },
    );

    // Verifies that setInputFormat is called with the selected option
    expect(mockSetInputFormat).toHaveBeenCalledWith(InputOptions.GMPL);
  });
});
