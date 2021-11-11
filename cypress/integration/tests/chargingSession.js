describe('session page', () => {
    beforeEach(() => {
        cy.visit('localhost:3000/session')
    })

    it('can go to next screen', () => {
        cy.get('.globalButtonText').click()
        cy.get('.yesButton').click()
        cy.url().should('eq', 'http://localhost:3000/feedback')
        cy.get('.responsiveText').contains(', please rate us!');
    })

    it('can cancel going to the next screen', () => {
        cy.get('.globalButtonText').click()
        cy.get('.cancelButton').click()
        cy.url().should('eq', 'http://localhost:3000/session')
        cy.get('.chargingTitle').contains('Departure at');
    })
})