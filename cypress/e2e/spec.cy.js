// cypress/integration/navigation.spec.js
describe('Navigation Tests', () => {
  it('Navigiert zur Startseite und überprüft den Inhalt', () => {
    // 1. Öffnet die Webseite
    cy.visit('http://localhost:3000');

    // 2. Klickt auf einen Menüpunkt (z.B. "Startseite")
    cy.contains('Description').click();

    // 3. Überprüft, ob der erwartete Inhalt auf der Seite vorhanden ist
    cy.get('div').should('contain', 'Description of the application');
  });
});
