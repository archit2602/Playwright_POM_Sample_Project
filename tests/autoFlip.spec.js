// Import required dependencies and page objects
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const AutoFlipPage = require('../pages/autoFlipPage');
const data = require('../fixtures/testData.json');

test.describe('Auto-Flip Clip Test', () => {

  // Login before each test
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(data.username, data.password);
  });

  test('Verify Auto-Flip functionality with 9:16 aspect ratio', async ({ page }) => {
    const autoFlipPage = new AutoFlipPage(page);

    // Execute auto-flip workflow
    await autoFlipPage.goToVideoTab();
    await autoFlipPage.openFirstStream();
    await autoFlipPage.openAutoFlipOptions();
    await autoFlipPage.selectAspectRatioAndAutoFlip();
    await autoFlipPage.confirmProcessInitiated();

    // Verify process initiation
    const initiate = await autoFlipPage.verifyProcessMessage();
    expect(initiate).toBeTruthy();
    
    // Preview and download the auto-flipped clip
    await autoFlipPage.previewClip();
    await autoFlipPage.applyAspectRatioFilter();
    await autoFlipPage.downloadClip();
  });

});
