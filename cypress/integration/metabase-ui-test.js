describe('Metabase UI tests', () => {
    it('Simple query', () => {
      cy.provisionMetabase().then(token => {
        cy.clearCookies({ timeout: 30000 });
        cy.visit("/", { timeout: 30000 });
        cy.get('input[name="username"]').type("pepe@balda.com");
        cy.get('input[name=password]').type("Pepe123");
        cy.get("form").submit();

        cy.get('a[href*="/question/new"]').click();
        cy.get('a[data-metabase-event="New Question; Simple Question Start"]').click();
        cy.get('a').contains('Orders').click();
        cy.get('div[class="cellData"]').contains('ID').click();
        cy.get('div[class="PopoverBody PopoverBody--withBackground"]').within(() => {
          cy.get('div').contains("Distincts").click();
        });
        cy.contains("18,760");
        cy.get('a[data-metabase-event="View Mode; Click Save"]').click();

        cy.get('input[name=name]').clear()
        cy.get('input[name=name]').type("Total Orders");
        cy.get('button').contains('Save').click();
        cy.get('button').contains('Yes please!').click();

        cy.get('h4').contains('Create a new dashboard').click();
        cy.get('input[name=name]').type("An awesome dashboard");
        cy.get('button').contains('Create').click();  
      })
  })
})
