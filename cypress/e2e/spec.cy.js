/* eslint-disable */
// Wenn man die E2E-Tests ausführen will, vorher Cypress lokal installieren.

// cypress/integration/navigation.spec.js
describe("Navigation and Language Selector Tests", () => {
  it("Wechselt die Sprache im Language Selector, fügt ein Beispiel in das Raw-Textfeld ein und klickt auf den SolveProblemButton", () => {
    // 1. Öffnet die Webseite
    cy.visit("http://localhost:3000");

    // 2. Klickt auf den Language Selector Button
    cy.get('[data-testid="language-selector-button"]').click();

    // 3. Wählt die Sprache "Deutsch" aus
    cy.get('[data-testid="language-option-de"]').click();

    // 4. Überprüft, ob der Text auf Deutsch angezeigt wird
    cy.get("div").should("contain", "Optimierungsrichtung");

    // 5. Klickt erneut auf den Language Selector Button und wechselt zurück auf Englisch
    cy.get('[data-testid="language-option-en"]').click({ force: true });

    // 6. Überprüft, ob der Text wieder auf Englisch angezeigt wird
    cy.get("div").should("contain", "Optimization Direction");

    // 7. Klickt auf den Button "Switch to Raw"
    cy.contains("Switch to Raw").click();

    // 8. Fügt das Beispiel in das Textarea-Feld ein
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

    // 9. Überprüft, ob der Text korrekt im Textfeld ist
    cy.get('[data-testid="raw-textarea"]').should("have.value", exampleInput);

    // 10. Klickt auf den SolveProblemButton
    cy.get('[data-testid="solve-problem-button"]').click();

    // 11. Optional: Überprüfe das Verhalten nach dem Klick (zum Beispiel eine Ergebnisanzeige)
    cy.get("div").should("contain", "Solution found"); // Beispielhaft
  });
});
