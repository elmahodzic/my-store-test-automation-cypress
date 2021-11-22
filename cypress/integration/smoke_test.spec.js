before(function () {
    cy.visitHomepage()
    cy.logoutIfLoggedIn()
    cy.login();
});

beforeEach(function () {
    cy.preserveTheCookie();
});

context("Make an order in My Store web app", function () {
    describe("Search for blouse and add it to cart", function () {
        it("Checking of search box", function () { 
           cy.get('#search_query_top').should('have.class','search_query form-control ac_input')});
        it("Checking if shopping cart is visible", function () {
            cy.get('[title="View my shopping cart"]').should('have.attr','href','http://automationpractice.com/index.php?controller=order').and('have.text','\n\t\t\tCart\n\t\t\t0\n\t\t\tProduct\n\t\t\tProducts\n\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t(empty)\n\t\t\t\t\t')});
        it("Checking of top menu", function () {
            cy.get('#block_top_menu').should('have.class','sf-contener clearfix col-lg-12')});
        it("Checking of sf menu", function () {
            cy.get('.sf-menu').should('have.class','sf-menu clearfix menu-content')});
        it("Checking visibility of info note", function () {
             cy.get('.info-account').should('have.text','Welcome to your account. Here you can manage all of your personal information and orders.')});
        it("Checking if is possible to go on 'My wishlist' ", function () {
             cy.get('.lnk_wishlist > a').should('have.attr','href','http://automationpractice.com/index.php?fc=module&module=blockwishlist&controller=mywishlist')});
        it("Checking of page heading 'My account' ", function () {
             cy.get('.page-heading').should('be.visible').and('have.text','My account')});
        it("Searching for a blouse in the search box", function () {
            cy.get('#search_query_top').should('be.empty')
            cy.get('#search_query_top').type('Blouse')});
        it("Click on search button", function () {
             cy.get('#searchbox > .btn').click()});

        it("Checking of navigation button", function () {
            cy.get('.navigation_page').should('have.text','Search')});
        it("Checking product sorting", function () {
            cy.get('#selectProductSort').should('have.class','selectProductSort form-control')});
        it("Checking if is possible to comparing product", function () {
            cy.get('.top-pagination-content > .compare-form').should('have.class','compare-form')});

        it("Add product to cart", function () {
            cy.get('.ajax_add_to_cart_button > span').should('have.text','Add to cart')
            cy.get('.ajax_add_to_cart_button > span').click()});
    });
    describe("Product successfully added to your shopping cart", function () {
        it("Checking if headline is visible", function () {
            cy.get('h2').should('be.visible')});
        it("Checking if the product image is visible", function () {
            cy.get('.product-image-container > .layer_cart_img').should('have.class','layer_cart_img img-responsive')});
        it("Checking if headline is visible", function () {
            cy.get('.layer_cart_product > h2').should('be.visible').and('have.text','\n\t\t\t\t\tProduct successfully added to your shopping cart\n\t\t\t\t')});

        it("Proceed to checkout after selecting a product", function () {
            cy.get('.button-container > .button-medium > span').click()});
    });
    describe("Proceed to checkout", function () {
        it("Checking visibility of cart titile", function () {
           cy.get('#cart_title').should('have.text','Shopping-cart summary\n\t\t\tYour shopping cart contains:\n\t\t\t1 Product\n\t\t\n\t')});
        it("Checking product availability", function () {
            cy.get('.label').should('have.text','In stock')});
        it("Checking visibility of info note", function () {
            cy.get('.heading-counter').should('be.visible').and('have.text','Your shopping cart contains:\n\t\t\t1 Product\n\t\t')});
        it("Checking deliverly address", function () {
            cy.get(':nth-child(1) > .address').should('have.class','address first_item item box')});
        it("Checking if the product image is visible", function () {
            cy.get('.cart_product > a > img').should('be.visible')});

        it("Proceed to checkout after checking shopping cart summary", function () {
            cy.get('.cart_navigation > .button > span').click()});
    });
    describe("Proceed to checkout", function () {
        it("Checking of page heading 'Addresses'", function () {
            cy.get('.page-heading').should('be.visible').and('have.text','Addresses')});
        it("Checking of dropdown list 'Deliverly address'", function () {
            cy.get('#id_address_delivery').should('have.class','address_select form-control').and('have.text','\n\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tMy address\n\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t')});
        it("Checking if is info note visible", function () {
            cy.get('#ordermsg > label').should('be.visible').and('have.text','If you would like to add a comment about your order, please write it in the field below.')});
        it("Checking if is text form empty", function () {
            cy.get('#ordermsg > .form-control').should('be.empty')});
        it("Checking logo visibility", function () {
            cy.get('.logo').should('have.class','logo img-responsive')});

        it("Proceed to checkout after checking addresses", function () {
            cy.get('.cart_navigation > .button > span').click()});
    });
    describe("Agree to terms and conditions", function () {
        it("Checking of page heading 'Shipping'", function () {
            cy.get('.page-heading').should('be.visible').and('have.text','Shipping')});
        it("Checking of possibility to go back", function () {
            cy.get('.button-exclusive').should('be.visible')});
        it("Checking of 'Terms&Service' form", function () {
            cy.get('.iframe').should('have.attr','href','http://automationpractice.com/index.php?id_cms=3&controller=cms&content_only=1').and('have.text','(Read the Terms of Service)')});
        it("Checking of possibility to contact", function () {
            cy.get('#contact-link > a').should('have.attr','href','http://automationpractice.com/index.php?controller=contact').and('have.text','Contact us')});

        it("Click on a checkbox", function () {
            cy.get('#cgv').click()});
    });
    describe("Proceed to checkout", function () {
        it("Proceed to checkout after checking details about shipping", function () {
            cy.get('.cart_navigation > .button > span').click()});

        it("Checking of payment methods", function () {
            cy.get('.page-heading').should('have.text','Please choose your payment method')
            cy.get('.bankwire').should('have.attr','href','http://automationpractice.com/index.php?fc=module&module=bankwire&controller=payment').and('have.text','\n            \tPay by bank wire (order processing will be longer)\n            ')
            cy.get('.cheque').should('have.text','\n                Pay by check (order processing will be longer)\n            ')});
        it("Checking if is headline visible", function () {
            cy.get('h1').should('be.visible').and('have.text','Please choose your payment method')});
        it("Checking availability of a product", function () {
            cy.get('.label').should('have.text','In stock')});
    });
    describe("Logout", function () {
        it("Logging out", function () {
            cy.logout()});

        it("Checking if is possible to sing in", function () {
            cy.get('.login').should('have.attr','href','http://automationpractice.com/index.php?controller=my-account')});
        it("Checking if is possible to go on homepage", function () {
            cy.get('.home').should('have.attr','href','http://automationpractice.com/')});
        it("Checking if is info note visible", function () {
            cy.get('.alert').should('be.visible').and('have.text','Your shopping cart is empty.')});
    });
});
