const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'Automation Exercise - Relatório de Testes',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },
  e2e: {
    chromeWebSecurity: false, // <-- Adicione esta linha
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    blockHosts: [
      "*pagead2.googlesyndication.com",
      "*googleads.g.doubleclick.net",
      "*adservice.google.com"
    ]
  },
});
