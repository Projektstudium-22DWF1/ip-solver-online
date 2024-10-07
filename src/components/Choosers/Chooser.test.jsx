import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Chooser from "./Chooser";

describe("Chooser Component", () => {
  const mockOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const mockOnChange = jest.fn();
  const mockLabel = "Test Label";
  const mockValue = "Option 1";

  test("renders without crashing", () => {
    render(
      <Chooser
        options={mockOptions}
        onChange={mockOnChange}
        label={mockLabel}
        value={mockValue}
      />
    );
    expect(screen.getByLabelText(mockLabel)).toBeInTheDocument();
  });

  test("renders correct options", () => {
    render(
      <Chooser
        options={mockOptions}
        onChange={mockOnChange}
        label={mockLabel}
        value={mockValue}
      />
    );

    // Öffnen des Dropdowns
    fireEvent.click(screen.getByRole("button"));

    // Verwende getAllByText, um mehrere Elemente mit demselben Text zu finden
    mockOptions.forEach((option) => {
      expect(screen.getAllByText(option.label).length).toBeGreaterThan(0);
    });
  });

  test("calls onChange when an option is selected", () => {
    render(
      <Chooser
        options={mockOptions}
        onChange={mockOnChange}
        label={mockLabel}
        value={mockValue}
      />
    );

    // Öffnen des Dropdowns
    fireEvent.click(screen.getByRole("button"));

    // Wähle eine andere Option aus
    fireEvent.change(screen.getByLabelText(mockLabel), {
      target: { value: "option2" },
    });

    expect(mockOnChange).toHaveBeenCalledWith("option2");
  });

  test("displays the correct initial value", () => {
    render(
      <Chooser
        options={mockOptions}
        onChange={mockOnChange}
        label={mockLabel}
        value={mockValue}
      />
    );

    // Überprüfen, dass der Button den korrekten Initialwert anzeigt
    expect(screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'span' && content === mockValue;
    })).toBeInTheDocument();
  });
});
