Cypress.Commands.add("getSetupToken", () => {
    cy.request('/api/session/properties').then((response) => {
        expect(response.status).to.eq(200)
        return response.body
    })
});

Cypress.Commands.add("provisionMetabase", () => {
    cy.getSetupToken().then(properties => {
        let user = {
          "database": null,
          "prefs": {
            "site_locale": "en",
            "site_name": "balda",
            "allow_tracking": false,
          },
          "user": {
            "email": "pepe@balda.com",
            "first_name": "pepe",
            "last_name": "balda",
            "password": "Pepe123",
            "site_name": "balda.com"
          },
          "token": properties["setup-token"]
        }
  
        cy.request('POST', '/api/setup', user).then((response) => {
          expect(response.status).to.eq(200)
          return response.body
        })
    })
});
