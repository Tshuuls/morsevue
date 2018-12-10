describe('Home page', () => {
  beforeEach(() => {
    cy.visit('#/userlist')
  })

  it('Shows table with headings', () => {
    cy.get('thead').should('contain', 'ID')
    cy.get('thead').should('contain', 'Firstname')
    cy.get('thead').should('contain', 'Lastname')
    cy.get('thead').should('contain', 'Score')
  })

  it('Shows filters', () => {
    cy.get('.VueTables__firstname-filter-wrapper').should('be.visible')
    cy.get('.VueTables__lastname-filter-wrapper').should('be.visible')
  })


  describe('test FirstNameFilter', () => {
    it('Finds existing Name', () => {
      cy.get('.VueTables__firstname-filter-wrapper > .form-control').type("e")
      cy.get('tbody').find('tr').should(($listOfElements) => {
        expect($listOfElements).to.have.length(2)
      })
      cy.get('tbody').within(() => {
        cy.get('tr:first >td').should('contain', 'Percival')
        cy.get('tr:nth-child(2)>td').should('contain', 'Karen')
      })
    })
    it('Finds non existing name', () => {
      cy.get('.VueTables__firstname-filter-wrapper > .form-control').type("ö")
      cy.get('tbody').find('tr').should(($listOfElements) => {
        expect($listOfElements).to.have.length(1)
      })
      cy.get('.VueTables__no-results').should('be.visible')
    })

  })

  describe('test LastNamefilter', () => {
    it('Finds existing name', () => {
      cy.get('.VueTables__lastname-filter-wrapper > .form-control').type("u")
      cy.get('tbody').find('tr').should(($listOfElements) => {
        expect($listOfElements).to.have.length(2)
      })
      cy.get('tbody').within(() => {
        cy.get('tr:first >td').should('contain', 'Murdock')
        cy.get('tr:nth-child(2) >td').should('contain', 'Budd')
      })
    })
    it('Finds non existing name', () => {
      cy.get('.VueTables__lastname-filter-wrapper > .form-control').type("abse")
      cy.get('tbody').find('tr').should(($listOfElements) => {
        expect($listOfElements).to.have.length(1)
      })
      cy.get('.VueTables__no-results').should('be.visible')
    })

  })

  it('combining filters', () => {
    cy.get('.VueTables__firstname-filter-wrapper > .form-control').type("e")
    cy.get('.VueTables__lastname-filter-wrapper > .form-control').type("v")
    cy.get('tbody').find('tr').should(($listOfElements) => {
      expect($listOfElements).to.have.length(1)
    })
    cy.get('tbody').within(() => {
      cy.get('tr:first >td').should('contain', 'Graves')
    })
  })

})
