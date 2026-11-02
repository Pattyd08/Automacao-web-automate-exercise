const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false, // <-- Adicione esta linha
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    blockHosts: [
      "*pagead2.googlesyndication.com",
      "*googleads.g.doubleclick.net",
      "*adservice.google.com"
    ]
  },
});
