/// <reference types = "cypress"/>

describe('Automation Exercise Test Suite', () => {
    //Cadastro
    //cy.get() -> elementos baseados em css selector
    //cy.contains() -> elementos baseados em texto
    let nomeUsuario;
    let emailUsuario;
    let senhaUsuario;


    it('Cadastrar um novo usuario com sucesso', () => {
        cy.visit('https://www.automationexercise.com')
        cy.get('a[href*="login"]').click();

        // uma contantante para gerar um email unico a cada execução do teste, armazenando a hora atual em milissegundos em uma variavel
        const timestamp = new Date().getTime();
        nomeUsuario = 'PGATS AUT';
        emailUsuario = `pgat-aut-${timestamp}@testmail.com`;
        senhaUsuario = '123456';

        cy.get('[data-qa="signup-name"]').type(nomeUsuario);

        //adicionando a constante timestamp ao email para garantir que seja unico a cada execução do teste
        cy.get('[data-qa="signup-email"]').type(emailUsuario);

        cy.get('[data-qa="signup-button"]').click();

        //radio buttons e checkboxes
        cy.get('#id_gender2').check();

        cy.get('[data-qa="password"]').type(senhaUsuario);
        cy.get('[data-qa="days"]').select('1');
        cy.get('[data-qa="months"]').select('1');
        cy.get('[data-qa="years"]').select('2000');

        cy.get('#newsletter').check();

        cy.get('[data-qa="first_name"]').type('PGATS');
        cy.get('[data-qa="last_name"]').type('AUT');
        cy.get('[data-qa="company"]').type('PGATS AUT LTDA');
        cy.get('[data-qa="address"]').type('Rua Teste, 123');
        cy.get('[data-qa="country"]').select('Canada');
        cy.get('[data-qa="state"]').type('Ontario');
        cy.get('[data-qa="city"]').type('Toronto');
        cy.get('[data-qa="zipcode"]').type('M1B 2K3');
        cy.get('[data-qa="mobile_number"]').type('+1 416 123 4567');

        cy.get('[data-qa="create-account"]').click();

        cy.get('[data-qa="account-created"]')
            .should('be.visible')
            .and('contain', 'Account Created!')
    });

    it('Login de usuáro com email e senha corretos', () => {
        cy.visit('https://www.automationexercise.com')
        cy.get('a[href*="login"]').click();

        cy.get('[data-qa="login-email"]').type(emailUsuario)
        cy.get('[data-qa="login-password"]').type(senhaUsuario)

        cy.get('[data-qa="login-button"]').click()

        //cy.get('a').should('contain', 'PGATS AUT')
        //cy.contains('.navbar-nav li', 'PGATS AUT')

        cy.get('.navbar-nav li')
            .contains(nomeUsuario)
            .should('be.visible')

    });

    it('Login de Usuário com email e senha INCORRETOS', () => {
        cy.visit('https://www.automationexercise.com/login')

        // ACT
        cy.get('[data-qa="login-email"]').type('pgats-aut-test-1791030872114@mail.com')
        cy.get('[data-qa="login-password"]').type('54321')

        cy.get('[data-qa="login-button"]').click()

        cy.get('form[action*="login"] > p')
            .should('exist')
            .should('be.visible')
            .should('contain', 'Your email or password is incorrect!')
            .and('contain.text', 'Your email or password is incorrect!')

    });

    it('Efetuar Logout', () => {
        cy.visit('https://www.automationexercise.com/login')

        // ACT
        cy.get('[data-qa="login-email"]').type(emailUsuario)
        cy.get('[data-qa="login-password"]').type(senhaUsuario)
        cy.get('[data-qa="login-button"]').click()

        cy.get('.navbar-nav li')
            .contains(nomeUsuario)
            .should('be.visible')

        // assert do login
        cy.get('a[href*="logout"]')
            .should('be.visible')
            .click()

        cy.get('.login-form > h2').should('be.visible')
        cy.get('a[href*="logout"]').should('not.exist')
        cy.get('[action*="login"]').should('be.visible');
        cy.url().should('include', 'login')

    });

    it('Tentar cadastrar usuário com e-mail já cadastrado', () => {
        cy.visit('https://www.automationexercise.com')
        cy.get('a[href*=login]').click()

        // const timestamp = new Date().getTime()

        cy.get('[data-qa="signup-name"]').type(nomeUsuario)
        cy.get('[data-qa="signup-email"]').type(emailUsuario)

        cy.get('[data-qa="signup-button"]').click()

        cy.get('form[action*=signup] p')
            .should('exist')
            .should('be.visible')
            .should('contain', 'Email Address already exist!')
            .and('contain.text', 'Email Address already exist!')

    });

});