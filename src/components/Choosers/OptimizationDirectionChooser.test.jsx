import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import OptimizationDirectionChooser from "./OptimizationDirectionChooser";
import { LanguageContext } from "../../context/LanguageContext";

describe("OptimizationDirectionChooser Component", () => {
  const mockTranslations = {
    optimizationDirection: "Optimization Direction",
  };
  const mockSetOptimizationDirection = jest.fn();

  const renderComponent = (optimizationDirection) => {
    render(
      <LanguageContext.Provider value={{ translations: mockTranslations }}>
        <OptimizationDirectionChooser
          optimizationDirection={optimizationDirection}
          setOptimizationDirection={mockSetOptimizationDirection}
        />
      </LanguageContext.Provider>,
    );
  };

  test("renders without crashing and displays correct label", () => {
    renderComponent("Maximize");

    // Check if the label is rendered correctly
    expect(screen.getByLabelText("Optimization Direction")).toBeInTheDocument();
  });

  test("renders correct options", () => {
    renderComponent("Maximize");

    fireEvent.click(screen.getByRole("button"));

    // Check if both options are rendered using more specific queries
    expect(screen.getAllByText("Maximize").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Minimize").length).toBeGreaterThan(0);
  });

  test("calls setOptimizationDirection when an option is selected", () => {
    renderComponent("Maximize");

    fireEvent.click(screen.getByRole("button"));

    fireEvent.change(screen.getByLabelText("Optimization Direction"), {
      target: { value: "Minimize" },
    });

    // Check if the function is called with the correct value
    expect(mockSetOptimizationDirection).toHaveBeenCalledWith("Minimize");
  });
});
