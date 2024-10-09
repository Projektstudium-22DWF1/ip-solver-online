/* eslint-disable */
// Before running the E2E tests, make sure to install Cypress locally.

// cypress/integration/navigation.spec.js
describe("Navigation and Language Selector Tests", () => {
  it("Switches the language using the Language Selector, inputs an example into the Raw Textarea, and clicks the SolveProblemButton", () => {
    // 1. Opens the website
    cy.visit("http://localhost:3000");

    //2
    cy.contains("Start optimizing").click();

    // 3. Clicks the Language Selector button
    cy.get('[data-testid="language-selector-button"]').click();

    // 4. Selects the German language option
    cy.get('[data-testid="language-option-de"]').click();

    // 5. Verifies that the content is displayed in German
    cy.get("div").should("contain", "Optimierungsrichtung");

    // 6. Clicks the Language Selector button again and switches back to English
    cy.get('[data-testid="language-option-en"]').click({ force: true });

    // 7. Verifies that the content is displayed in English again
    cy.get("div").should("contain", "Optimization Direction");

    // 8. Clicks the "Switch to Raw" button
    cy.contains("Switch to Raw").click();

    // 9. Inputs the example text into the textarea
    const exampleInput = `Maximize obj: x1 + 2 x2 + 4 x3 + x4
Subject To
  c1: - x1 + x2 + x3 + 10 x4 <= 20
  c2: x1 - 4 x2 + x3 <= 30
  c3: x2 - 0.5 x4 = 0
Bounds
  0 <= x1 <= 40
  2 <= x4 <= 3
End`;

    cy.get('[data-testid="raw-textarea"]')
      .clear()
      .type(exampleInput, { delay: 0 });

    // 10. Verifies that the textarea contains the correct value
    cy.get('[data-testid="raw-textarea"]').should("have.value", exampleInput);

    // 11. Clicks the SolveProblemButton
    cy.get('[data-testid="solve-problem-button"]').click({ force: true });

    // 12. Optional: Verifies the behavior after clicking (for example, checks for a result display)
    cy.get("div").should("contain", "Status: Optimal");
  });
});
