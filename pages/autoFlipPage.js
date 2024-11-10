const { timeout } = require("../playwright.config");

// Class for handling auto-flip functionality and operations
class AutoFlipPage {
    constructor(page) {
      this.page = page;
      // Selectors for page elements
      this.acceptAllCookies = '[data-testid="Cookies-button-AcceptAll"]';
      this.videoTab = '[data-testid="NavigationBar-videos"]';
      this.streamList = '.style_overlay__bB80w';
      this.threeDotMenu = '[class="ant-dropdown-trigger style_more__QoSWc"]';
      this.autoFlipAndDynamicFlip = '[class="style_dropdownItem__3x4Bz"]';
      this.aspectRatioOption = '[class="style_container__7Ibxi"]';
      this.autoFlip = '[class="style_primaryButton__DlotR"]';
      this.toastBox = 'div.ant-notification-notice.style_container__gYzXH'
      this.previewButton = '[class="style_imageContainer__CA1sB"]';
      this.closeWindow = '[data-testid="Modal-close-icon"]';
      this.nineSixteenFilter = '[data-testid="AspectRatioSection-9:16-EfRjkF7H5"]';
    }
  
    // Navigate to video tab and handle cookie consent if shown
    async goToVideoTab() {
        await this.page.waitForTimeout(5000);
        const isVisible = await this.page.isVisible(this.acceptAllCookies);
        if (isVisible) {
          await this.page.click(this.acceptAllCookies);
        }
      await this.page.click(this.videoTab);
    }
  
    // Open first video stream
    async openFirstStream() {
      await this.page.click(this.streamList);
    }
  
    // Open auto-flip options menu
    async openAutoFlipOptions() {
      await this.page.click(this.threeDotMenu);
      await this.page.locator(this.autoFlipAndDynamicFlip).nth(1).click();
    }
  
    // Select 9:16 aspect ratio option
    async selectAspectRatioAndAutoFlip() {
      await this.page.locator(this.aspectRatioOption).nth(2).click();
    }
  
    // Initiate auto-flip process
    async confirmProcessInitiated() {
      await this.page.locator(this.autoFlip).nth(1).click();
    }

    // Verify process initiation message
    async verifyProcessMessage() {
        await this.page.waitForSelector(this.toastBox, { state: 'visible' });
        await this.page.focus(this.toastBox);
        const processMessage = await this.page.innerText(this.toastBox);
        return processMessage.includes("Process initiated successfully");
    }

    // Preview the auto-flipped clip
    async previewClip() {
      await this.page.waitForSelector(this.previewButton, { state: 'visible', timeout:3000 });
      await this.page.locator(this.previewButton).nth(1).click({ force: true });
    }
  
    // Apply 9:16 aspect ratio filter and verify
    async applyAspectRatioFilter() {
      await this.page.click(this.closeWindow);
      await this.page.click(this.nineSixteenFilter);
      const isClicked = await this.page.isChecked(this.nineSixteenFilter);
      return isClicked;
    }
  
    // Download clip and verify download started
    async downloadClip() {
      await this.page.click(this.threeDotMenu);
      await this.page.locator(this.autoFlipAndDynamicFlip).nth(0).click()
      await this.page.waitForSelector(this.toastBox, { state: 'visible' });
      await this.page.focus(this.toastBox);
      const downloadMessage = await this.page.innerText(this.toastBox);
      return downloadMessage.includes("Download started");
    }
}

module.exports = AutoFlipPage;