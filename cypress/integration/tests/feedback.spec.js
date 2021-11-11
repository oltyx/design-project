describe("ensure working feedback form", () => {
    const COMMENT = "BOOM";
    
    beforeEach(() => {
      cy.visit("http://localhost:3000/feedback");
      cy.waitForReact();
    });
  
    it("User submits feedback", () => {
      cy.get(".feedback").findByRole("alert").should("not.exist");
      cy.react("CustomRating").click();
      cy.react("Comments").click();
      cy.react("TextField").type(COMMENT);
      cy.react("GlobalButton").click();
      cy.get(".feedback").findByRole("alert").should("exist");
      cy.on("window:alert", (txt) => {
        expect(txt).to.equal("Thank you for your feedback!");
      })
      cy.location("pathname").should("eq", "/");

    });
  
    it("user exits", () => {
      cy.get(".feedback").findByRole("alert").should("not.exist");
      cy.get(".w-100.row").get(".p-0.col").findAllByRole("button").click();
      cy.on("window:alert", (txt) => {
        expect(txt).to.equal("Please rate us next time! Your feedback is very important for us :)");
      })
      cy.location("pathname").should("eq", "/");
    });
  
    it("User fills in the form but exits", () => {
      cy.get(".feedback").findByRole("alert").should("not.exist");
      cy.get(".w-100.row").get(".p-0.col").findAllByRole("button").click();
      cy.on("window:alert", (txt) => {
        expect(txt).to.equal("Please rate us next time! Your feedback is very important for us :)");
      })
      cy.location("pathname").should("eq", "/");
    });

    it("User submits empty form", () => {
      cy.get(".feedback").findByRole("alert").should("not.exist");
      cy.react("GlobalButton").click();
      cy.on("window:alert", (txt) => {
        expect(txt).to.equal("Please rate us next time! Your feedback is very important for us :)");
      })
      cy.location("pathname").should("eq", "/");   
    });

    it("Unit testing per component", () => {
      cy.react("Comments").click();
      cy.react("TextField").type(COMMENT);
      cy.react("CustomRating").click();
    })
  });