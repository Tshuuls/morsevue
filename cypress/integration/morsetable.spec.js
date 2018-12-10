describe('Home page', () => {
  beforeEach(() => {
    cy.visit('#/morsetable')
  })

  it('Shows table with headings', () => {
    cy.get('thead').should('contain', 'ID')
    cy.get('thead').should('contain', 'Code')
    cy.get('thead').should('contain', 'Letter')
  })

  it('Shows filters', () => {
    cy.get('.VueTables__morse-filter-wrapper').should('be.visible')
    cy.get('.VueTables__letter-filter-wrapper').should('be.visible')
  })

  it('Shows 26 rows in tablebody', () => {
    cy.get('tbody').find('tr').should(($listOfElements) => {
      expect($listOfElements).to.have.length(26)
    })
  })

  describe('test CodeFilter', () => {
    it('Finds existing code', () => {
      cy.get('.VueTables__morse-filter-wrapper > .form-control').type(".-.")
      cy.get('tbody').find('tr').should(($listOfElements) => {
        expect($listOfElements).to.have.length(3)
      })
      cy.get('tbody').within(() => {
        cy.get('tr:first >td').should('contain', '3')
        cy.get('tr:nth-child(2)>td').should('contain', '6')
        cy.get('tr:nth-child(3)>td').should('contain', '12')
      })
    })
    it('Finds non existing code', () => {
      cy.get('.VueTables__morse-filter-wrapper > .form-control').type(".....")
      cy.get('tbody').find('tr').should(($listOfElements) => {
        expect($listOfElements).to.have.length(1)
      })
      cy.get('.VueTables__no-results').should('be.visible')
    })

  })

  describe('test LetterFilter', () => {
    it('Finds existing code', () => {
      cy.get('.VueTables__letter-filter-wrapper > .form-control').type("a")
      cy.get('tbody').find('tr').should(($listOfElements) => {
        expect($listOfElements).to.have.length(1)
      })
      cy.get('tbody').within(() => {
        cy.get('tr:first >td').should('contain', '1')
      })
    })
    it('Finds non existing code', () => {
      cy.get('.VueTables__letter-filter-wrapper > .form-control').type("ö")
      cy.get('tbody').find('tr').should(($listOfElements) => {
        expect($listOfElements).to.have.length(1)
      })
      cy.get('.VueTables__no-results').should('be.visible')
    })

  })

})
