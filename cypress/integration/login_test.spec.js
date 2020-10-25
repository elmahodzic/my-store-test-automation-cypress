const valid_username ="tester072020@gmail.com";
const valid_password = "Testing2020";
const invalid_username ="tester072020@gmail.comg";
const invalid_password = "Testing2020g";
const blank_username =" ";
const blank_password = " ";
const new_password= "0123456789"


before(function () {
    cy.visitHomepage()
    cy.logoutIfLoggedIn()
});
afterEach(function(){
    cy.logoutIfLoggedIn()
});
describe("Negative test cases for Login page", function () {   
    it("Sign in with valid email address and blank password", function () {
        cy.get('.logo').should('have.class','logo img-responsive')
        cy.get('#block_top_menu').should('have.class','sf-contener clearfix col-lg-12')
        cy.get('#home-page-tabs > :nth-child(2) > .blockbestsellers').should('have.class','blockbestsellers').and('have.text','Best Sellers')
        cy.get('.login').click()
        cy.get('#create-account_form').should('have.id','create-account_form')
        cy.get('.page-heading').should('have.class','page-heading').and('have.text','Authentication')
        cy.get('#login_form').should('have.class','box')
        cy.get('#newsletter-input').should('have.class','inputNew form-control grey newsletter-input')
        cy.get('#email').type(valid_username)
        cy.get('#passwd').type(blank_password)
        cy.get('#SubmitLogin > span').click() 
        cy.get('#center_column > :nth-child(2)').children().should('have.text','There is 1 error\n\t\t\t\t\tPassword is required.\n\t\t\t\t')});
    it("Sign in with blank email address and valid password", function () {
        cy.get('.logo').should('have.class','logo img-responsive')
        cy.get('.home').should('have.attr','href','http://automationpractice.com/')
        cy.get('.login').click()
        cy.get('#login_form > .page-subheading').should('have.text','Already registered?')
        cy.get('#email').type(blank_username)
        cy.get('#passwd').type(valid_password)
        cy.get('#SubmitLogin > span').click()
        cy.get('#center_column > :nth-child(2)').children().should('have.text','There is 1 error\n\t\t\t\t\tAn email address required.\n\t\t\t\t')});
    it("Sign in with valid email address and invalid password", function () {
        cy.get('.page-heading').should('be.visible')
        cy.get('#email_create').should('be.empty')
        cy.get('.lost_password').should('have.class','lost_password form-group')
        cy.get('.login').click()
        cy.get('#email').type(valid_username)
        cy.get('#passwd').type(invalid_password)
        cy.get('h4 > a').should('be.visible').and('have.text','My account')
        cy.get('#SubmitLogin > span').click()
        cy.get('#center_column > :nth-child(2)').children().should('have.text','There is 1 error\n\t\t\t\t\tAuthentication failed.\n\t\t\t\t')});
    it("Sign in with invalid email address and valid password", function () {
        cy.get('#social_block > h4').should('be.visible')
        cy.get('#email_create').should('be.empty')
        cy.get('.login').click()
        cy.get('#email').type(invalid_username)
        cy.get('#passwd').type(valid_password)
        cy.get('#newsletter_block_left > h4').should('be.visible').and('have.text','Newsletter')
        cy.get('#SubmitLogin > span').click()
        cy.get('#center_column > :nth-child(2)').children().should('have.text','There is 1 error\n\t\t\t\t\tAuthentication failed.\n\t\t\t\t')});
    it("Sign in with blank email address and blank password", function () {
        cy.get('.page-heading').should('be.visible')
        cy.get('.shop-phone').should('have.class','shop-phone')
        cy.get('#newsletter-input').should('be.empty')
        cy.get('#email_create').should('be.empty')
        cy.get('#create-account_form > .form_content > p').should('have.text','Please enter your email address to create an account.')
        cy.get('.login').click()
        cy.get('#email').type(blank_username)
        cy.get('#passwd').type(blank_password)
        cy.get('#SubmitLogin > span').click()
        cy.get('#center_column > :nth-child(2)').children().should('have.text','There is 1 error\n\t\t\t\t\tAn email address required.\n\t\t\t\t')});
    it("Create an account with already used email address", function () {
        cy.get('#center_column').should('have.class','center_column col-xs-12 col-sm-12')
        cy.get('#email_create').should('be.empty')
        cy.get('#create-account_form > .form_content > p').should('have.text','Please enter your email address to create an account.')
        cy.get('.login').click()
        cy.get('#email_create').type(valid_username)
        cy.get('#SubmitCreate > span').click() 
        cy.get('#create_account_error').children().should('have.text','An account using this email address has already been registered. Please enter a valid password or request a new one. ' )});
    it("Sign in with two email addresses in a row", function () {
        cy.get('.logo').should('have.class','logo img-responsive')
        cy.get('.login').click()
        cy.get('.page-heading').should('have.text','Authentication')
        cy.get('.blockcategories_footer > h4').should('have.text','Categories')
        cy.get('#email').type(valid_username).type(valid_username)
        cy.get('#passwd').type(valid_password)
        cy.get('#SubmitLogin > span').click()
        cy.get('#center_column > :nth-child(2)').should('have.text','\n\t\tThere is 1 error\n\t\t\n\t\t\t\t\tInvalid email address.\n\t\t\t\t\n\t\t\t')});
    it("Sign in with old password when password was changed", function () {  
        cy.get('.login').click()
        cy.get('#create-account_form').should('have.id','create-account_form')
        cy.get('#newsletter-input').should('have.class','inputNew form-control grey newsletter-input')
        cy.get('#email').type(valid_username)
        cy.get('#passwd').type(valid_password)
        cy.get('#SubmitLogin > span').click()
        cy.get('.info-account').should('have.text','Welcome to your account. Here you can manage all of your personal information and orders.')
        cy.get(':nth-child(1) > .myaccount-link-list > :nth-child(1) > a > span').should('have.text','Order history and details')
        cy.get('.myaccount-link-list > :nth-child(4) > a > span').click()
        cy.get(':nth-child(9) > label').should('be.visible')
        cy.get('#security_informations > i').should('have.text','[Insert customer data privacy clause here, if applicable]')
        cy.get('#old_passwd').type(valid_password)
        cy.get('#passwd').type(new_password)
        cy.get('#confirmation').type(new_password)
        cy.get(':nth-child(11) > .btn > span').click()
        cy.get('.logout').click()
        cy.get('#email').type(valid_username)
        cy.get('#passwd').type(valid_password)
        cy.get('#SubmitLogin > span').click()
        cy.get('#center_column > :nth-child(2)').children().should('have.text','There is 1 error\n\t\t\t\t\tAuthentication failed.\n\t\t\t\t')});    

    after(function(){
    cy.changePasswordToAnOldOne()
    });

});


