import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SolverChooser from "./SolverChooser";
import { LanguageContext } from "../../context/LanguageContext";

// Mocking the SolverInterface module to avoid importing GLPK
jest.mock("../../services/SolverInterface", () => ({
  SolverOptions: {
    HIGHS: "HIGHS",
    GLPK: "GLPK",
  },
}));

describe("SolverChooser Component", () => {
  const mockTranslations = {
    solverOptions: "Solver Options",
  };
  const mockSetSolverOption = jest.fn();

  const renderComponent = (solverOption) => {
    render(
      <LanguageContext.Provider value={{ translations: mockTranslations }}>
        <SolverChooser solverOption={solverOption} setSolverOption={mockSetSolverOption} />
      </LanguageContext.Provider>
    );
  };

  test("renders without crashing and displays correct label", () => {
    renderComponent("HIGHS");

    // Check if the label is rendered correctly
    expect(screen.getByLabelText("Solver Options")).toBeInTheDocument();
  });

  test("renders correct solver options", () => {
    renderComponent("HIGHS");

    // Open the dropdown by clicking the button
    fireEvent.click(screen.getByRole("button"));

    // Check if both solver options are rendered
    expect(screen.getAllByText("HIGHS").length).toBeGreaterThan(0);
    expect(screen.getAllByText("GLPK").length).toBeGreaterThan(0);
  });

  test("calls setSolverOption when an option is selected", () => {
    renderComponent("HIGHS");

    // Open the dropdown by clicking the button
    fireEvent.click(screen.getByRole("button"));

    // Select a different option
    fireEvent.change(screen.getByLabelText("Solver Options"), {
      target: { value: "GLPK" },
    });

    // Check if the function is called with the correct value
    expect(mockSetSolverOption).toHaveBeenCalledWith("GLPK");
  });
});
