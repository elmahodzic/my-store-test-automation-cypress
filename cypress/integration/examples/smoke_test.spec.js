describe("Make an order in My Store web app", function () {
    it("Visit homepage My Store", function () {
        cy.visit("http://automationpractice.com/index.php");
    });
    it("Sign in My store web app", function () {
        cy.get('.login').click();
    });
    it("Enter valid username and password to sign in", function () {
        cy.get('#email')
      .type('tester072020@gmail.com')
      cy.get('#passwd')
      .type('Testing2020')
      cy.get('#SubmitLogin > span').click()
    });
    it("Search for blouse and add it to cart", function () {
        cy.get('#search_query_top').type('Blouse')
        cy.get('#searchbox > .btn').click()
        cy.get('.ajax_add_to_cart_button > span').click()
    });
    it("Product successfully added to your shopping cart", function () {
        cy.get('.button-container > .button-medium > span').click()
    });



});