// Class for handling deleting video
class DeleteVideo {
    constructor(page) {
      this.page = page;
      this.videoTab = '[data-testid="NavigationBar-videos"]';
      this.streamList = '.style_overlay__bB80w';
      this.threeDotMenu = '[class="ant-dropdown-trigger style_more__QoSWc"]';
      this.moreActions = '[class="ant-menu-submenu ant-menu-submenu-vertical"]';
      this.deleteButton = '//div[normalize-space(text())="Delete"]';
      this.confirmDelete = '[data-testid="ConfirmModal-button-Delete Clips"]';
      this.toastBox = 'div.ant-notification-notice.style_container__gYzXH'
    }
  
    // Delete video by clicking on the three dot menu, hovering over more actions, and confirming deletion
    async delete() {
      await this.page.click(this.videoTab)
      await this.page.click(this.streamList)
      await this.page.click(this.threeDotMenu);
      await this.page.locator(this.moreActions).nth(1).hover();
      await this.page.click(this.deleteButton);
      await this.page.click(this.confirmDelete);
    }

    async verifyDeleteMessage() {
        await this.page.waitForSelector(this.toastBox, { state: 'visible' });
        await this.page.focus(this.toastBox);
        const processMessage = await this.page.innerText(this.toastBox);
        return processMessage.includes("Clip deleted successfully");
    }
  }
  
  module.exports = DeleteVideo;