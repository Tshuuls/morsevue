describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('.navbar').contains('Logout').click()
    cy.visit('/')
  })

  it('Shows  Form ', () => {
    cy.get('form').within(() => {
      cy.get('div:first').should('contain', 'Email')
      cy.get('div:nth-child(2)').should('contain', 'Email is Required')
      cy.get('div:nth-child(3)').should('contain', 'Password')
      cy.get('div:nth-child(4)').should('contain', 'Password is Required')
    })
  })

  describe('Fill in form', () => {
    it('properly', () => {
      cy.get('form').within(() => {
        cy.get('#inputemail').type("vue@test.com")
        cy.get('#inputpassword').type("test1234")
        cy.get('button').contains("Sign in").click()
      })
      cy.get('.lead').contains("Welcome vue@test.com")
    })


  })
})
