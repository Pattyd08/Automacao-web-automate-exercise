# Passo a Passo

npm init -v
npm install = D cypress@13.7.3

npx cypress open
    e2e testing
    continue
    chrome
    scallfold example specs

Aplicação simulador de e-commerce: https://www.automationexercise.com/


## Pedir a IA sugestão de tratamento de gerar emails aletatorios para cadastro:

1 - uso do Timestamp
it('Cadastrar um novo usuario com sucesso', () => {
  const timestamp = Date.now();
  const emailDinamico = `pgat_aut_${timestamp}@testmail.com`;

  cy.visit('https://www.automationexercise.com/login');

  cy.get('[data-qa="signup-name"]').type('PGATS AUT');
  cy.get('[data-qa="signup-email"]').type(emailDinamico);
  cy.get('[data-qa="signup-button"]').click();
});


2 - uso do Faker:
npm install --save-dev @faker-js/faker

import { faker } from '@faker-js/faker';

it('Cadastrar um novo usuario com sucesso', () => {
  const nomeAleatorio = faker.person.fullName();
  const emailAleatorio = faker.internet.email();

  cy.visit('https://www.automationexercise.com/login');

  cy.get('[data-qa="signup-name"]').type(nomeAleatorio);
  cy.get('[data-qa="signup-email"]').type(emailAleatorio);
  cy.get('[data-qa="signup-button"]').click();
});

## Exercício para fazer em casa valendo 1 pt extra. (Até 18/10/2026)

Introdução a Aplicações Web

Hands-on

Instale a biblioteca cypress-xpath no projeto e tente adaptar os seletores para usar xpath.
Observe aspectos como legibilidade, velocidade de execução e compartilhe suas percepções na aula.
Vale 1 pt. extra. Enviar apenas a spec via plataforma.

1. npm install -D cypress-xpath

2. No arquivo cypress/support/e2e.js, adicione a linha de importação no final do arquivo:
require('cypress-xpath');
(Ou import 'cypress-xpath';)
  
3. Adaptar os seletores da sua spec para cy.xpath()
Pegue os seletores que você já escreveu no arquivo de teste (por exemplo, automation-exercise.cy.js) e converta-os para a sintaxe XPath usando o comando cy.xpath():   

CSS: cy.get('a[href*="login"]')
XPath: cy.xpath('//a[contains(@href, "login")]')

CSS: cy.get('[data-qa="signup-name"]')
XPath: cy.xpath('//*[@data-qa="signup-name"]')

CSS: cy.get('[data-qa="signup-email"]')
XPath: cy.xpath('//*[@data-qa="signup-email"]')

CSS: cy.get('#id_gender2')
XPath: cy.xpath('//*[@id="id_gender2"]') ou cy.xpath('//input[@id="id_gender2"]')

CSS: cy.get('#newsletter')
XPath: cy.xpath('//input[@id="newsletter"]')
