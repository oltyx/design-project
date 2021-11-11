describe('start page', () => {
    beforeEach(() => {
        cy.visit('localhost:3000')
    })

    it('can go to next screen', () => {
        cy.get('.globalButtonText').click()
        cy.url().should('eq', 'http://localhost:3000/schedule')
        cy.get('.col').contains('Select Departure Time');
    })
})