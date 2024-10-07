import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react";
import OutputUi from "./OutputUi";
import { LanguageContext } from "../context/LanguageContext";

const translations = {
  summary: "Summary",
  logs: "Logs",
  output: "Output",
  variables: "Variables",
  constraints: "Constraints",
  noDataAvailable: "No data available",
  noLogsAvailable: "No logs available",
  logsNotSupported: "Logs not supported",
  noOutputAvailable: "No output available",
  outputNotSupported: "Output not supported",
  modelGeneratesNoOutput: "Model generates no output",
  noVariablesAvailable: "No variables available",
  noConstraintsAvailable: "No constraints available",
  status: "Status",
  objectiveValue: "Objective Value",
  walltime: "Walltime",
  seconds: "seconds",
};

describe("OutputUi Component", () => {
  const mockOutputData = {
    Status: "Optimal",
    ObjectiveValue: 123.45,
    Walltime: 1.23,
    GlpkLog: "Sample log data",
    GlpkOutput: "Sample output data",
    Columns: {
      x1: { Name: "x1", Primal: 1, Status: "BS", Lower: 0, Upper: 10, Dual: 0 },
    },
    Rows: [{ Name: "c1", Primal: 0, Status: "UB", Lower: 0, Upper: 5, Dual: 1 }],
  };

  test("renders summary tab by default", () => {
    render(
      <LanguageContext.Provider value={{ translations }}>
        <OutputUi outputData={mockOutputData} />
      </LanguageContext.Provider>
    );
    expect(screen.getByText("Summary")).toBeInTheDocument();
    expect(screen.getByText(/Status:/i)).toBeInTheDocument();
    expect(screen.getByText("Optimal")).toBeInTheDocument();
  });

  test("renders no data available message when no outputData is passed", () => {
    render(
      <LanguageContext.Provider value={{ translations }}>
        <OutputUi outputData={null} />
      </LanguageContext.Provider>
    );
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  test("switches to logs tab and displays log content", async () => {
    render(
      <LanguageContext.Provider value={{ translations }}>
        <OutputUi outputData={mockOutputData} />
      </LanguageContext.Provider>
    );

    // Wrap the fireEvent in `act` to ensure it triggers state updates correctly
    await act(async () => {
      fireEvent.click(screen.getByText("Logs"));
    });

    // Wait for the log content to appear
    await waitFor(() => expect(screen.getByText("Sample log data")).toBeInTheDocument());
  });
});
