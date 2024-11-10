// Import required dependencies and page objects
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const VideoEditorPage = require('../pages/videoEditorPage');
const data = require('../fixtures/testData.json');

test.describe('Trim Clip Flow', () => {

  // Login before each test
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(data.username, data.password);
  });

  test('Trim video clip and save', async ({ page }) => {
    const videoEditorPage = new VideoEditorPage(page);

    // Navigate and trim the clip
    await videoEditorPage.goToVideoTab();
    await videoEditorPage.openFirstStream();
    await videoEditorPage.confirmTrimOptionIsEnabled();
    await videoEditorPage.trimClip('00:02:02:756', '00:02:11:797');
    await videoEditorPage.saveTrimmedClip(data.trimmedClipTitle);

    // Wait for and verify clip creation notifications
    await page.waitForSelector(videoEditorPage.toastBox, { state: 'visible' });

    const initiate = await videoEditorPage.verifyInitiateMessage();
    expect(initiate).toBeTruthy();

    await page.waitForTimeout(5000)

    await page.waitForSelector(videoEditorPage.toastBox, { state: 'visible' });
    const success = await videoEditorPage.verifySuccessMessage();
    expect(success).toBeTruthy();

    // Preview the trimmed clip
    await videoEditorPage.previewTrimmedClip({ timeout: 30000 });
    await page.waitForTimeout(10000);
  });
});
