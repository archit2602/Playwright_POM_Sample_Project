// Class for handling login page interactions and authentication
class LoginPage {
    constructor(page) {
      this.page = page;
      // Selectors for login form elements
      this.usernameInput = 'input[name="email"]';
      this.passwordInput = 'input[name="password"]';
      this.loginButton = 'button[type="submit"]';
    }
  
    // Navigate to the login page URL from test data
    async navigate() {
      const data = require('../fixtures/testData.json');
      await this.page.goto(data.url);
    }
  
    // Fill login form and submit credentials
    async login(username, password) {
      await this.page.fill(this.usernameInput, username);
      await this.page.fill(this.passwordInput, password);
      await this.page.click(this.loginButton);
    }
  }
  
  module.exports = LoginPage;