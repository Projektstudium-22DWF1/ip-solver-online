// App.test.js

import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock the glpk.min.js module to avoid GLPK-related errors during tests
jest.mock("./dist/glpk.min.js", () => ({
  solve: jest.fn(() => Promise.resolve({}))
}));

test("renders the homepage title", () => {
  render(<App />);
  const homepageTitle = screen.getByText(/Optimized Solutions/i); 
  expect(homepageTitle).toBeInTheDocument();
});
