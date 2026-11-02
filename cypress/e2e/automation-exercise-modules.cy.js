/// <reference types = "cypress"/>

const cadastro = require('../modules/cadastro/index.js');

describe('Automation Exercise Test Suite', () => {
    let nomeUsuario;
    let emailUsuario;
    let senhaUsuario;
    const produtoPesquisado = 'Dress';

    it('1 - Cadastrar um novo usuario com sucesso', () => {
        cy.visit('https://www.automationexercise.com')
        cy.get('a[href*="login"]').click();

        // uma contantante para gerar um email unico a cada execução do teste, armazenando a hora atual em milissegundos em uma variavel
        const timestamp = new Date().getTime();
        nomeUsuario = 'PGATS AUT';
        emailUsuario = `pgat-aut-${timestamp}@testmail.com`;
        senhaUsuario = '123456';

        cadastro.iniciarCadastro(nomeUsuario, emailUsuario);
        cadastro.preencherCadastro(senhaUsuario);
        cadastro.verificarSeCadastroFoiEfetuadoComSucesso();
    });

    it('2 - Login de usuáro com email e senha corretos', () => {
        cy.visit('https://www.automationexercise.com')
        cy.get('a[href*="login"]').click();
        preencherLogin(emailUsuario, senhaUsuario);
        verificarSeLoginFoiEfetuadoComSucesso(nomeUsuario);
    });

    it('3 - Login de Usuário com email e senha INCORRETOS', () => {
        cy.visit('https://www.automationexercise.com/login')

        preencherLogin('pgats-aut-test-1791030872114@mail.com', '54321')
        verificarSeMensagemDeErroFoiExibidaNoLogin();
    });

    it('4 - Efetuar Logout', () => {
        cy.visit('https://www.automationexercise.com/login')

        //preencherLogin('pgat-aut-teste01@testmail.com', '123456');
        preencherLogin(emailUsuario, senhaUsuario);

        verificarSeLoginFoiEfetuadoComSucesso(nomeUsuario);

        efetuarLogout();

        verificarSeOUsuarioFoiDeslogado();
    });

    it('5 - Tentar cadastrar usuário com e-mail já cadastrado', () => {
        cy.visit('https://www.automationexercise.com')
        cy.get('a[href*=login]').click()

        //iniciarCadastro('PGATS AUT', 'pgat-aut-teste01@testmail.com');
        cadastro.iniciarCadastro(nomeUsuario, emailUsuario);

        verificarSeMensagemDeCadastroExistetenteFoiExibida();
    });

    it('8 - Verificar todos os produtos e a página de detalhes do produto', () => {
        cy.visit('http://automationexercise.com');

        verificarSePaginaInicialEstaVisivel();
        navegarParaPaginaDeProdutos();
        verificarSePaginaDeTodosOsProdutosEstaVisivel();
        acessarPrimeiroProdutoDaLista();
        verificarSePaginaDeDetalhesDoProdutoEstaVisivel();
        verificarDetalhesDoProduto();
    });


    it('9 - Pesquisar produto e validar resultados da busca', () => {
        cy.visit('http://automationexercise.com');

        cadastro.validarPaginaInicialVisivel();
        cadastro.navegarParaProdutos();
        cadastro.validarPaginaTodosOsProdutos();
        cadastro.pesquisarProduto(produtoPesquisado);
        cadastro.validarSessaoProdutosPesquisados();
        cadastro.validarProdutosRelacionados(produtoPesquisado);
    });

    it('10 - Verificar assinatura na página inicial', () => {
        const timestamp = new Date().getTime();
        const emailAssinatura = `usuario-${timestamp}@testmail.com`;

        cy.visit('http://automationexercise.com');

        cadastro.rolarAteORodape();
        cadastro.validarTituloAssinatura();
        cadastro.preencherEmailEEnviar(emailAssinatura);
        cadastro.validarMensagemDeSucesso();
    });

    it('15 - Fazer pedido: Registre-se antes de finalizar a compra', () => {
        cy.visit('http://automationexercise.com');
        cadastro.validarPaginaInicialVisivel();

        cy.get('a[href*="login"]').click();

        const timestamp = new Date().getTime();
        const nome = 'PGATS AUT';
        const email = `pgat-aut-${timestamp}@testmail.com`;
        const senha = '123456';

        cadastro.iniciarCadastro(nome, email);
        cadastro.preencherCadastro(senha);
        cadastro.verificarSeCadastroFoiEfetuadoComSucesso();

        cy.get('[data-qa="continue-button"]').click();

        verificarSeLoginFoiEfetuadoComSucesso(nome);

        cy.get('.features_items .col-sm-4').first().within(() => {
            cy.contains('Add to cart').click();
        });

        cy.get('.modal-content').should('be.visible');
        cy.get('.modal-content a[href="/view_cart"]').click();

        cy.url().should('include', '/view_cart');
        cy.get('#cart_info').should('be.visible');

        // Clique em "Finalizar Compra"
        cy.contains('Proceed To Checkout').click();

        cy.get('#address_delivery').should('contain.text', 'Rua Teste, 123');
        cy.get('#cart_info').should('be.visible');

        cy.get('textarea[name="message"]').type('Pedido de teste automatizado via Cypress');
        cy.get('a[href="/payment"]').click();

        realizarPagamentoEConfirmarPedido();

        // Clique no botão "Excluir conta"
        cy.get('a[href*="delete_account"]').click();

        //  Verifique se a mensagem 'CONTA EXCLUÍDA!' e clique no botão 'Continuar'
        cy.get('[data-qa="account-deleted"]').should('be.visible').and('contain.text', 'Account Deleted!');
        cy.get('[data-qa="continue-button"]').click();
    });

    it('16 - Fazer pedido: Faça login antes de finalizar a compra', () => {
        cy.visit('http://automationexercise.com');
        cadastro.validarPaginaInicialVisivel();

        cy.get('a[href*="login"]').click();
        preencherLogin(emailUsuario, senhaUsuario);
        verificarSeLoginFoiEfetuadoComSucesso(nomeUsuario);
        adicionarProdutoAoCarrinhoEAcessar();
       
        //Clique em "Finalizar Compra"
        cy.contains('Proceed To Checkout').click();

        cy.get('#address_delivery').should('contain.text', 'Rua Teste, 123');
        cy.get('#cart_info').should('be.visible');

        cy.get('textarea[name="message"]').type('Pedido de teste automatizado via Cypress');
        cy.get('a[href="/payment"]').click();

        realizarPagamentoEConfirmarPedido();

        //Clique no botão 'Excluir conta'
        cy.get('a[href*="delete_account"]').click();
        cy.get('[data-qa="account-deleted"]').should('be.visible').and('contain.text', 'Account Deleted!');
        cy.get('[data-qa="continue-button"]').click();
    });


    // Funções auxiliares (Produtos)
    function verificarSePaginaInicialEstaVisivel() {
        cy.get('a[href="/"] > img').should('be.visible');
        cy.get('.features_items').should('be.visible');
    }

    function navegarParaPaginaDeProdutos() {
        cy.get('a[href="/products"]').should('be.visible').click();
    }

    function verificarSePaginaDeTodosOsProdutosEstaVisivel() {
        cy.url().should('include', '/products');
        cy.get('.title.text-center')
            .should('be.visible')
            .and('contain.text', 'All Products');
        cy.get('.features_items .col-sm-4')
            .should('be.visible')
            .and('have.length.greaterThan', 0);
    }

    function acessarPrimeiroProdutoDaLista() {
        cy.get('a[href^="/product_details/"]')
            .first()
            .should('be.visible')
            .click();
    }

    function verificarSePaginaDeDetalhesDoProdutoEstaVisivel() {
        cy.url().should('include', '/product_details/');
        cy.get('.product-information').should('be.visible');
    }

    function verificarDetalhesDoProduto() {
        cy.get('.product-information h2')
            .should('be.visible')
            .and('not.be.empty');

        cy.get('.product-information p')
            .contains('Category:')
            .should('be.visible');

        cy.get('.product-information span span')
            .should('be.visible')
            .and('contain.text', 'Rs.');

        cy.get('.product-information p')
            .contains('Availability:')
            .should('be.visible');

        cy.get('.product-information p')
            .contains('Condition:')
            .should('be.visible');

        cy.get('.product-information p')
            .contains('Brand:')
            .should('be.visible');
    }

    //Login
    function preencherLogin(emailUsuario, senhaUsuario) {
        cy.get('[data-qa="login-email"]').type(emailUsuario)
        cy.get('[data-qa="login-password"]').type(senhaUsuario)

        cy.get('[data-qa="login-button"]').click()
    }

    function verificarSeLoginFoiEfetuadoComSucesso(nomeUsuario) {
        cy.get('.navbar-nav li')
            .contains(nomeUsuario)
            .should('be.visible')
    }

    function verificarSeMensagemDeErroFoiExibidaNoLogin() {
        cy.get('form[action*="login"] > p')
            .should('exist')
            .should('be.visible')
            .should('contain', 'Your email or password is incorrect!')
            .and('contain.text', 'Your email or password is incorrect!')
    }

    function efetuarLogout() {
        cy.get('a[href*="logout"]')
            .should('be.visible')
            .click()
    }

    function verificarSeOUsuarioFoiDeslogado() {
        cy.get('.login-form > h2').should('be.visible')
        cy.get('a[href*="logout"]').should('not.exist')
        cy.get('[action*="login"]').should('be.visible');
        cy.url().should('include', 'login')
    }

    function verificarSeMensagemDeCadastroExistetenteFoiExibida() {
        cy.get('form[action*=signup] p')
            .should('exist')
            .should('be.visible')
            .should('contain', 'Email Address already exist!')
            .and('contain.text', 'Email Address already exist!')
    }

    function realizarPagamentoEConfirmarPedido(dadosCartao = {}) {
    const dadosPadrao = {
        nome: 'PGATS AUT',
        numero: '4111111111111111',
        cvc: '311',
        mesValidade: '12',
        anoValidade: '2028'
    };

    function adicionarProdutoAoCarrinhoEAcessar() {
    // Adiciona o primeiro produto da lista ao carrinho
    cy.get('.features_items .col-sm-4').first().within(() => {
        cy.contains('Add to cart').click();
    });

    // Clica no link do Carrinho exibido no modal de confirmação
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-content a[href="/view_cart"]').click();

    // Valida se a página do carrinho foi carregada corretamente
    cy.url().should('include', '/view_cart');
    cy.get('#cart_info').should('be.visible');
}

    const cartao = { ...dadosPadrao, ...dadosCartao };

    // 14. Insira os dados de pagamento
    cy.get('[data-qa="name-on-card"]').type(cartao.nome);
    cy.get('[data-qa="card-number"]').type(cartao.numero);
    cy.get('[data-qa="cvc"]').type(cartao.cvc);
    cy.get('[data-qa="expiry-month"]').type(cartao.mesValidade);
    cy.get('[data-qa="expiry-year"]').type(cartao.anoValidade);

    // 15. Clique no botão "Pagar e Confirmar Pedido"
    cy.get('[data-qa="pay-button"]').click();

    // 16. Verifique a mensagem de sucesso
    cy.contains('Your order has been placed successfully!').should('be.visible');
}

});