describe('Metabase API', () => {
  
  it('Creates users and add them to groups', () => {
    cy.provisionMetabase().then(token => {

      let user = {
        "first_name": "cacho",
        "last_name": "cacho",
        "email": "cacho@cacho.com",
        "password": "Cacho123",
      }

      cy.request({
        url: "/api/user",
        method: "POST",
        body: user,
        headers: {
          'Content-type': 'application/json', 
          'Cookie': 'metabase.SESSION=' + token['id']}
      }).then((response) => {
        expect(response.status).to.eq(200)
        const user_id = response.body["id"]
        cy.request({
          url: "/api/permissions/group",
          method: "POST",
          body: {"name": "test_group"},
          headers: {
            'Content-type': 'application/json', 
            'Cookie': 'metabase.SESSION=' + token['id']}
        }).then((response) => {
          expect(response.status).to.eq(200)
          const group_id = response.body["id"]

          cy.request({
            url: "/api/permissions/membership",
            method: "POST",
            body: {"user_id": user_id, "group_id": group_id},
            headers: {
              'Content-type': 'application/json', 
              'Cookie': 'metabase.SESSION=' + token['id']}
          }).then((response) => {
            expect(response.status).to.eq(200)
          })
        })  
      })
    })
  })
})
