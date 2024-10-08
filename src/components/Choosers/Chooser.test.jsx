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
    // Renders the Chooser component
    render(
      <Chooser
        options={mockOptions}
        onChange={mockOnChange}
        label={mockLabel}
        value={mockValue}
      />,
    );
    // Checks if the component is rendered
    expect(screen.getByLabelText(mockLabel)).toBeInTheDocument();
  });

  test("renders correct options", () => {
    render(
      <Chooser
        options={mockOptions}
        onChange={mockOnChange}
        label={mockLabel}
        value={mockValue}
      />,
    );

    fireEvent.click(screen.getByRole("button"));

    // Verifies all options are rendered
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
      />,
    );

    fireEvent.click(screen.getByRole("button"));
    fireEvent.change(screen.getByLabelText(mockLabel), {
      target: { value: "option2" },
    });

    // Verifies onChange is called with the selected option
    expect(mockOnChange).toHaveBeenCalledWith("option2");
  });

  test("displays the correct initial value", () => {
    render(
      <Chooser
        options={mockOptions}
        onChange={mockOnChange}
        label={mockLabel}
        value={mockValue}
      />,
    );

    // Verifies the button shows the initial value
    expect(
      screen.getByText((content, element) => {
        return (
          element.tagName.toLowerCase() === "span" && content === mockValue
        );
      }),
    ).toBeInTheDocument();
  });
});
