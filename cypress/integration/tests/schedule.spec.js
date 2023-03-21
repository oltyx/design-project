

describe('Schedule page tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/schedule')
        cy.waitForReact()
        // Fix the date and time to 8 November 2021, 9:00
        var now = new Date(2021, 10, 8, 9, 0)
        var clock = cy.clock(now)

        cy.viewport(480, 1600)
    })

    it('shows graph and price/emission when preferences are filled in', () => {
        // Skip setting time
        // Set energy to 50 kWh
        cy.react("EnergySelector").react("StyledSlider").type(50000)

        // Set mode to Solar
        cy.get('.modeSelector .solarCol button')
            .click()

        // Check that the price changed, so is not €0
        cy.get('nav.navbarSchedule')
            .contains('Price')
            .invoke('text')
            .should('not.eq', 'Price: €0')

        // Check that the CO2 emissions changed, so not equal to 0g
        cy.get('nav.navbarSchedule')
            .contains('CO2')
            .invoke('text')
            .should('not.eq', 'CO2: 0g')

        // Check that the graph has charging data in it
        // cy.react("Graph").react("ComposedChart").invoke('attr', )
    })
})