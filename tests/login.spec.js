const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const data = require('../fixtures/testData.json');

test('Login to Magnifi video editor', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login(data.username, data.password);

  // Verify redirect after successful login
  await expect(page).toHaveURL(/dashboard|editor/);
});
