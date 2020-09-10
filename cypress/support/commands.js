Cypress.Commands.add("getSetupToken", () => {
    cy.request('/api/session/properties').then((response) => {
        expect(response.status).to.eq(200)
        return response.body
    })
});

Cypress.Commands.add("provisionMetabase", (provision_mongo=false) => {
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

        if (provision_mongo) {
          user["database"] = {
            "auto_run_queries": true,
            "details": {
              "additional-options": null,
              "authdb": "admin",
              "dbname": "sample",
              "host": "mongo",
              "pass": "metasample123",
              "port": 27017,
              "ssl": false,
              "tunnel-enabled": false,
              "use-connection-uri": false,
              "use-srv": false,
              "user": "metabase"
            },            
            "engine": "mongo",
            "is_full_sync": true,
            "name": "balda"
          };
        }
  
        cy.request('POST', '/api/setup', user).then((response) => {
          expect(response.status).to.eq(200)
          return response.body
        })
    })
});
