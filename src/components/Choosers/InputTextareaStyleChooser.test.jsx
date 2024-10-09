import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ImportTextareaStyleChooser from "./InputTextareaStyleChooser";
import { LanguageContext } from "../../context/LanguageContext";

describe("ImportTextareaStyleChooser Component", () => {
  const mockTranslations = {
    switchTo: "Switch to",
    raw: "Raw",
    guided: "Guided",
    gmplTooltip: "GMPL mode requires Raw input.",
  };

  const mockSetTextareaStyle = jest.fn();
  const mockSetProblem = jest.fn(); // Mock für setProblem

  const renderComponent = (textareaStyle, inputFormat) => {
    render(
      <LanguageContext.Provider value={{ translations: mockTranslations }}>
        <ImportTextareaStyleChooser
          textareaStyle={textareaStyle}
          setTextareaStyle={mockSetTextareaStyle}
          inputFormat={inputFormat}
          setProblem={mockSetProblem} // Hinzufügen der Mock-Funktion für setProblem
        />
      </LanguageContext.Provider>,
    );
  };

  test("renders the button with Guided as initial textarea style", () => {
    renderComponent("Guided", "LP");
    expect(screen.getByText("Switch to Raw")).toBeInTheDocument();
  });

  test("toggles textarea style when the button is clicked", () => {
    renderComponent("Guided", "LP");
    const button = screen.getByText("Switch to Raw");
    fireEvent.click(button);
    expect(mockSetTextareaStyle).toHaveBeenCalled();
  });

  test("disables the button and shows tooltip when inputFormat is GMPL", () => {
    renderComponent("Raw", "GMPL");
    const button = screen.getByText("Switch to Guided");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute(
      "data-uk-tooltip",
      `title:${mockTranslations.gmplTooltip}; pos: bottom-right`,
    );
  });

  test("automatically sets textareaStyle to Raw when inputFormat is GMPL", () => {
    renderComponent("Guided", "GMPL");
    expect(mockSetTextareaStyle).toHaveBeenCalledWith("Raw");
  });

  test("automatically sets textareaStyle to Guided when inputFormat is not GMPL", () => {
    renderComponent("Raw", "LP");
    expect(mockSetTextareaStyle).toHaveBeenCalledWith("Guided");
  });
});
