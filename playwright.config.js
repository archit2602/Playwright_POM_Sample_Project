// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    slowMo: 250, 
    headless: true,
    baseURL: 'https://uat.magnifi.ai',
    // viewport: { width: 1280, height: 720 },
  },
  timeout: 60000,
//   retries: 1
});
