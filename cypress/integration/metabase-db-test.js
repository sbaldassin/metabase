describe('Metabase UI tests', () => {
    it('Simple query', () => {
      cy.provisionMetabase(true).then(token => {
        cy.clearCookies({ timeout: 30000 });
        cy.visit("/", { timeout: 30000 });
        cy.get('input[name="username"]').type("pepe@balda.com");
        cy.get('input[name=password]').type("Pepe123");
        cy.get("form").submit();
        cy.get("h3").contains("balda").click();
        cy.get("div").contains("Products").click();
        cy.get("div").contains("Filter").click();
        cy.get('div[class="List-section List-section--expanded"]').should('have.length', 10)
        cy.get('div[class="List-section List-section--expanded"]').contains("Created At").click();
        cy.get('div').contains("Previous").click();
        cy.get("h4").contains("On").click();
        cy.get('input[class="borderless full p1 h3"]').clear().type("01/19/2017");
        cy.get("div").contains("Add filter").click();
        cy.contains("Showing 4 rows");
      })
  })
})
