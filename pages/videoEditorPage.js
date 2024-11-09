// Class for handling video editor page interactions and operations
class VideoEditorPage {
    constructor(page) {
      this.page = page;
      // Selectors for page elements
      this.acceptAllCookies = '[data-testid="Cookies-button-AcceptAll"]';
      this.videoTab = '.style_overlay__bB80w';
      this.editVideo = '[class="style_tag__C8Akh style_ctaTag__aR70W"]';
      this.trimOption = '[data-testid="EditingSidebarToolBarItem-trim"]';
      this.startTime = '[data-testid="EditingSidebarContentTrim-startTime"]';
      this.endTime = '[data-testid="EditingSidebarContentTrim-endTime"]';
      this.applyTrim = '[data-testid="EditingSidebarContentTrim-button-Apply"]';
      this.generateButton = '[data-testid="ClipInfoEditorSectionHeader-button-Generate"]';
      this.saveAsNewButton = '[data-testid="ClipEditorTrimClipConfirmationModal-button-Save-as-New"]';
      this.toastBox = 'div.ant-notification-notice.style_container__gYzXH'
      this.titleInput = '[data-testid="ClipEditorTrimClipConfirmationModal-input-Title"]';
      this.saveButton = '[data-testid="ClipEditorTrimClipConfirmationModal-button-Save"]'
      this.viewClipButton = '//button[normalize-space(text())="View Clip"]';
      this.clipStartTime = '[data-testid="ClipTrimModal-startTime"]';
      this.clipEndTime = '[data-testid="ClipTrimModal-endTime"]';
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
  
    // Open first video stream for editing
    async openFirstStream() {
      await this.page.locator(this.editVideo).nth(0).click();
    }
  
    // Check if trim option is available
    async confirmTrimOptionIsEnabled() {
      const isTrimOptionEnabled = await this.page.isEnabled(this.trimOption);
      return isTrimOptionEnabled;
    }
  
    // Set trim start and end times for the clip
    async trimClip(start, end) {
      await this.page.click(this.trimOption);
      await this.page.click(this.startTime);
      await this.page.fill(this.startTime, start);
      await this.page.click(this.endTime);
      await this.page.fill(this.endTime, end);
    }
  
    // Save trimmed clip with given title
    async saveTrimmedClip(title) {
      await this.page.click(this.applyTrim);
      await this.page.click(this.generateButton);
      await this.page.click(this.saveAsNewButton);
      await this.page.fill(this.titleInput, title);
      await this.page.click(this.saveButton);
    }

    // Verify clip creation initiation message
    async verifyInitiateMessage() {
      await this.page.waitForSelector(this.toastBox, { state: 'visible' });
      await this.page.focus(this.toastBox);
      const successMessage = await this.page.innerText(this.toastBox);
      return successMessage.includes("Clip creation Initiated.");
    }
  
    // Verify successful clip creation message
    async verifySuccessMessage() {
      await this.page.waitForSelector(this.toastBox, { state: 'visible' });
      await this.page.focus(this.toastBox);
      const successMessage = await this.page.innerText(this.toastBox);
      return successMessage.includes("Clip has been created successfully!");
    }
  
    // Preview trimmed clip and return start/end times
    async previewTrimmedClip() {
      await this.page.click(this.viewClipButton);
      await this.page.waitForTimeout(2000)
      await this.page.waitForSelector(this.clipStartTime);
      await this.page.waitForSelector(this.clipEndTime);
      const actualStartTime = await this.page.innerText(this.clipStartTime);
      const actualEndTime = await this.page.innerText(this.clipEndTime);
      return {
        startTime: actualStartTime,
        endTime: actualEndTime
      };
    }
  }
  
  module.exports = VideoEditorPage;