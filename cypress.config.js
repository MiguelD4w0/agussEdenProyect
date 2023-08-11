const { defineConfig } = require("cypress");

module.exports = defineConfig({
  /*env: {
    viewporMobile:{
      device: "iphone-xr"
    },
    viewportdesktop:{
      device: "macbook-16"
    },

  }*/
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
