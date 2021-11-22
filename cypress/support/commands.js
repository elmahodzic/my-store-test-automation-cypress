// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add("visitHomepage", () => {
    cy.visit("http://automationpractice.com/index.php");
});
Cypress.Commands.add("login", () => {
    cy.get('.login').click();
    cy.get('#email').type('test.test2021@gmail.com')
    cy.get('#passwd').type('Test2021')
    cy.get('#SubmitLogin > span').click()
});
Cypress.Commands.add("logout", () => {
    cy.get('.logout').click()
});
Cypress.Commands.add("logoutIfLoggedIn", () => {
    cy.get('body').then($body => {
        if ($body.find('.account').length > 0) {
            cy.get('nav > :nth-child(2) > .logout').click({ multiple: true })
        } else {
            cy.log('Already logged out')
        }
    })
});
Cypress.Commands.add("changePasswordToAnOldOne", () => {
    cy.visit("http://automationpractice.com/index.php")
    cy.get('.login').click();
    cy.get('#email').type('test.test2021@gmail.com')
    cy.get('#passwd').type('0123456789')
    cy.get('#SubmitLogin > span').click()
    cy.get('.myaccount-link-list > :nth-child(4) > a > span').click()
    cy.get('#old_passwd').type('0123456789')
    cy.get('#passwd').type('Test2021')
    cy.get('#confirmation').type('Test2021')
    cy.get(':nth-child(11) > .btn > span').click()
    cy.get('.logout').click()
});

Cypress.Commands.add("preserveTheCookie", () => {
    Cypress.Cookies.preserveOnce("PrestaShop-a30a9934ef476d11b6cc3c983616e364")
});
