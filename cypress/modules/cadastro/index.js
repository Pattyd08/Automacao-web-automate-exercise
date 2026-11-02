const seletores = {
    logoInicial: 'a[href="/"] > img',
    carrosselInicial: '#slider',
    botaoProdutos: 'a[href="/products"]',
    tituloSessao: '.title.text-center',
    campoPesquisa: '#search_product',
    botaoPesquisar: '#submit_search',
    listaProdutos: '.features_items .col-sm-4',
    descricaoItemProduto: '.productinfo p',
    rodape: '#footer',
    tituloAssinatura: '#footer h2',
    campoEmail: '#susbscribe_email',
    botaoInscrever: '#subscribe',
    mensagemSucesso: '#success-subscribe'
};

//Cadastro
function iniciarCadastro(nomeUsuario, emailUsuario) {

    cy.get('[data-qa="signup-name"]').type(nomeUsuario);
    cy.get('[data-qa="signup-email"]').type(emailUsuario);
    cy.get('[data-qa="signup-button"]').click();
}

function preencherCadastro(senhaUsuario) {
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
}

function verificarSeCadastroFoiEfetuadoComSucesso() {
    cy.get('[data-qa="create-account"]').click();

    cy.get('[data-qa="account-created"]')
        .should('be.visible')
        .and('contain', 'Account Created!')
}

function verificarSeMensagemDeCadastroExistenteFoiExibida() {
    cy.get('form[action*=signup] p')
        .should('exist')
        .should('be.visible')
        .should('contain', 'Email Address already exist!')
        .and('contain.text', 'Email Address already exist!')
}

function validarPaginaInicialVisivel() {
    cy.get(seletores.logoInicial).should('be.visible');
    cy.get(seletores.carrosselInicial).should('be.visible');
}

function navegarParaProdutos() {
    cy.get(seletores.botaoProdutos).should('be.visible').click();
}

function validarPaginaTodosOsProdutos() {
    cy.url().should('include', '/products');
    cy.contains('.features_items .title.text-center', /all products/i)
        .should('be.visible');
}

function pesquisarProduto(termo) {
    cy.get(seletores.campoPesquisa).clear().type(termo);
    cy.get(seletores.botaoPesquisar).click();
}

function validarSessaoProdutosPesquisados() {
    cy.contains('.features_items .title.text-center', /searched products/i)
        .should('be.visible');
}


function validarProdutosRelacionados() {
    cy.get(seletores.listaProdutos)
        .should('be.visible')
        .and('have.length.greaterThan', 0)
        .each(($produto) => {
            cy.wrap($produto).should('be.visible');
        });
}

function rolarAteORodape() {
    cy.get(seletores.rodape).scrollIntoView();
}

function validarTituloAssinatura() {
    cy.contains(seletores.tituloAssinatura, /subscription/i)
        .should('be.visible');
}

function preencherEmailEEnviar(email) {
    cy.get(seletores.campoEmail).clear().type(email);
    cy.get(seletores.botaoInscrever).click();
}

function validarMensagemDeSucesso() {
    cy.get(seletores.mensagemSucesso)
        .should('be.visible')
        .and('contain.text', 'You have been successfully subscribed!');
}

module.exports = {
    iniciarCadastro,
    preencherCadastro,
    verificarSeCadastroFoiEfetuadoComSucesso,
    verificarSeMensagemDeCadastroExistenteFoiExibida,
    validarPaginaInicialVisivel,
    navegarParaProdutos,
    validarPaginaTodosOsProdutos,
    pesquisarProduto,
    validarSessaoProdutosPesquisados,
    validarProdutosRelacionados,
    rolarAteORodape,
    validarTituloAssinatura,
    preencherEmailEEnviar,
    validarMensagemDeSucesso
}