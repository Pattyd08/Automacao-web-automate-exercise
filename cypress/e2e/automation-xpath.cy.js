/// <reference types = "cypress"/>

describe('Automation Exercise Test Suite', () => {
    it('Cadastrar um novo usuario com sucesso', () => {
        cy.visit('https://www.automationexercise.com')

        cy.xpath('//a[contains(@href, "login")]').click();

        const timestamp = new Date().getTime();

        cy.xpath('//*[@data-qa="signup-name"]').type('PGATS AUT');

        cy.xpath('//*[@data-qa="signup-email"]').type(`pgat-aut-${timestamp}@testmail.com`);
        //cy.xpath('//*[@data-qa="signup-email"]').type(`pgat-aut-teste01@testmail.com`);

        cy.xpath('//*[@data-qa="signup-button"]').click();

        cy.xpath('//*[@id="id_gender2"]').check();

        cy.xpath('//*[@data-qa="password"]').type('123456');

        cy.xpath('//*[@data-qa="days"]').select('1');
        cy.xpath('//*[@data-qa="months"]').select('1');
        cy.xpath('//*[@data-qa="years"]').select('2000');

        cy.xpath('//*[@id="newsletter"]').check();

        cy.xpath('//*[@data-qa="first_name"]').type('PGATS');
        cy.xpath('//*[@data-qa="last_name"]').type('AUT');
        cy.xpath('//*[@data-qa="company"]').type('PGATS AUT LTDA');
        cy.xpath('//*[@data-qa="address"]').type('Rua Teste, 123');
        cy.xpath('//*[@data-qa="country"]').select('Canada');
        cy.xpath('//*[@data-qa="state"]').type('Ontario');
        cy.xpath('//*[@data-qa="city"]').type('Toronto');
        cy.xpath('//*[@data-qa="zipcode"]').type('M1B 2K3');
        cy.xpath('//*[@data-qa="mobile_number"]').type('+1 416 123 4567');

        cy.xpath('//*[@data-qa="create-account"]').click();

        cy.xpath('//*[@data-qa="account-created"]')
            .should('be.visible')
            .and('contain', 'Account Created!')
    });

    it('Login de usuáro com email e senha corretos', () => {
        cy.visit('https://www.automationexercise.com')
        cy.xpath('//a[contains(@href, "login")]').click();
        cy.xpath('//*[@data-qa="login-email"]').type('pgat-aut-teste01@testmail.com')
        cy.xpath('//*[@data-qa="login-password"]').type('123456')

        cy.xpath('//*[@data-qa="login-button"]').click()

        cy.xpath('//ul[contains(@class, "navbar-nav")]//li[contains(., "PGATS AUT")]')
            .should('be.visible');
    });

    it('Login de Usuário com email e senha INCORRETOS', () => {
        cy.visit('https://www.automationexercise.com/login')

        cy.xpath('//*[@data-qa="login-email"]').type('pgats-aut-test-1791030872114@mail.com')
        cy.xpath('//*[@data-qa="login-password"]').type('54321')

        cy.xpath('//*[@data-qa="login-button"]').click()

        cy.xpath('//form[contains(@action, "login")]/p')
            .should('exist')
            .should('be.visible')
            .should('contain', 'Your email or password is incorrect!')
            .and('contain.text', 'Your email or password is incorrect!')
    });

    it('Efetuar Logout', () => {
        cy.visit('https://www.automationexercise.com/login')

        cy.xpath('//*[@data-qa="login-email"]').type('pgat-aut-teste01@testmail.com')
        cy.xpath('//*[@data-qa="login-password"]').type('123456')
        cy.xpath('//*[@data-qa="login-button"]').click()

        cy.xpath('//ul[contains(@class, "navbar-nav")]//li[contains(., "PGATS AUT")]')
            .should('be.visible');

        cy.xpath('//a[contains(@href, "logout")]')
            .should('be.visible')
            .click()

        cy.xpath('//div[contains(@class, "login-form")]/h2').should('be.visible');
        cy.xpath('//a[contains(@href, "logout")]').should('not.exist')
        cy.xpath('//form[contains(@action, "login")]').should('be.visible');
        cy.url().should('include', 'login')

    });

    it('Tentar cadastrar usuário com e-mail já cadastrado', () => {
        cy.visit('https://www.automationexercise.com')
        cy.xpath('//a[contains(@href, "login")]').click()

        cy.xpath('//*[@data-qa="signup-name"]').type('PGATS AUT')
        cy.xpath('//*[@data-qa="signup-email"]').type('pgat-aut-teste01@testmail.com')

        cy.xpath('//*[@data-qa="signup-button"]').click()

        cy.xpath('//form[contains(@action, "signup")]//p')
            .should('exist')
            .should('be.visible')
            .should('contain', 'Email Address already exist!')
            .and('contain.text', 'Email Address already exist!')
    });

});