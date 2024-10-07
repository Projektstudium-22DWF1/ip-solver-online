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

  const renderComponent = (textareaStyle, inputFormat) => {
    render(
      <LanguageContext.Provider value={{ translations: mockTranslations }}>
        <ImportTextareaStyleChooser
          textareaStyle={textareaStyle}
          setTextareaStyle={mockSetTextareaStyle}
          inputFormat={inputFormat}
        />
      </LanguageContext.Provider>,
    );
  };

  test("renders the button with Guided as initial textarea style", () => {
    renderComponent("Guided", "LP");

    // Überprüfe, ob der Button mit dem korrekten Text gerendert wird
    expect(screen.getByText("Switch to Raw")).toBeInTheDocument();
  });

  test("toggles textarea style when the button is clicked", () => {
    renderComponent("Guided", "LP");

    // Klicke auf den Button und überprüfe, ob die Funktion aufgerufen wurde
    const button = screen.getByText("Switch to Raw");
    fireEvent.click(button);

    // Überprüfe, ob `setTextareaStyle` aufgerufen wurde (einmalige Überprüfung, unabhängig vom Argument)
    expect(mockSetTextareaStyle).toHaveBeenCalled();
  });

  test("disables the button and shows tooltip when inputFormat is GMPL", () => {
    renderComponent("Raw", "GMPL");

    // Überprüfe, ob der Button deaktiviert ist
    const button = screen.getByText("Switch to Guided");
    expect(button).toBeDisabled();

    // Überprüfe, ob das Tooltip den richtigen Text enthält
    expect(button).toHaveAttribute(
      "data-uk-tooltip",
      `title:${mockTranslations.gmplTooltip}; pos: bottom-right`,
    );
  });

  test("automatically sets textareaStyle to Raw when inputFormat is GMPL", () => {
    renderComponent("Guided", "GMPL");

    // Überprüfe, ob die Funktion aufgerufen wurde, um textareaStyle auf "Raw" zu setzen
    expect(mockSetTextareaStyle).toHaveBeenCalledWith("Raw");
  });

  test("automatically sets textareaStyle to Guided when inputFormat is not GMPL", () => {
    renderComponent("Raw", "LP");

    // Überprüfe, ob die Funktion aufgerufen wurde, um textareaStyle auf "Guided" zu setzen
    expect(mockSetTextareaStyle).toHaveBeenCalledWith("Guided");
  });
});
