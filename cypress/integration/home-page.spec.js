describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Shows main title', () => {
    cy.get('.vue-title').should('contain', 'Morse Trainer')
  })

  describe('Navigation bar', () => {
    it('Shows the required links', () => {
      cy.get('.navbar-nav:nth-child(1)').within(() => {
        cy.get('.nav-item:first').should('contain', 'Home')
        cy.get('.nav-item:nth-child(2)').should('contain', 'Morse Table')
        cy.get('.nav-item:nth-child(3)').should('contain', 'ScoreBoard')
      })
      cy.get('.navbar-nav:nth-child(2)').within(() => {
        cy.get('.nav-item:first').should('contain', 'My Account')
        cy.get('.nav-item:nth-child(2)').should('contain', 'Logout')
      })
    })

    it('Redirects when links are clicked', () => {
      cy.get('.navbar').contains('Morse Table').click()
      cy.url().should('include', '/morsetable')

      cy.get('.navbar').contains('ScoreBoard').click()
      cy.url().should('include', '/userlist')
    })
  })
})
