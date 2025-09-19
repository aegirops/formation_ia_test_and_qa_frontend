import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly sidebarCollapse: Locator;
  readonly searchButton: Locator;
  readonly userMenuButton: Locator;
  readonly homeLink: Locator;
  readonly inboxLink: Locator;
  readonly customersLink: Locator;
  readonly settingsButton: Locator;
  readonly feedbackLink: Locator;
  readonly helpSupportLink: Locator;
  readonly cookieAcceptButton: Locator;
  readonly cookieOptOutButton: Locator;

  // Settings submenu
  readonly settingsGeneralLink: Locator;
  readonly settingsMembersLink: Locator;
  readonly settingsNotificationsLink: Locator;
  readonly settingsSecurityLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header elements
    this.sidebarCollapse = page.getByRole("button", {
      name: "Collapse sidebar",
    });
    this.searchButton = page.getByRole("button", { name: /Search.*⌘.*K/ });
    this.userMenuButton = page.getByRole("button", {
      name: "Benjamin Canac Benjamin Canac",
    });

    // Main navigation
    this.homeLink = page.getByRole("link", { name: "Home" });
    this.inboxLink = page.getByRole("link", { name: /Inbox.*\d+/ });
    this.customersLink = page.getByRole("link", { name: "Customers" });
    this.settingsButton = page.getByRole("button", { name: "Settings" });

    // Settings submenu
    this.settingsGeneralLink = page.getByRole("link", { name: "General" });
    this.settingsMembersLink = page.getByRole("link", { name: "Members" });
    this.settingsNotificationsLink = page.getByRole("link", {
      name: "Notifications",
    });
    this.settingsSecurityLink = page.getByRole("link", { name: "Security" });

    // Bottom navigation
    this.feedbackLink = page.getByRole("link", { name: "Feedback" });
    this.helpSupportLink = page.getByRole("link", { name: "Help & Support" });

    // Cookie banner
    this.cookieAcceptButton = page.getByRole("button", { name: "Accept" });
    this.cookieOptOutButton = page.getByRole("button", { name: "Opt out" });
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async navigateToHome() {
    await this.homeLink.click();
  }

  async navigateToInbox() {
    await this.inboxLink.click();
  }

  async navigateToCustomers() {
    await this.customersLink.click();
  }

  async navigateToSettings() {
    await this.settingsGeneralLink.click();
  }

  async navigateToSettingsMembers() {
    await this.settingsMembersLink.click();
  }

  async navigateToSettingsNotifications() {
    await this.settingsNotificationsLink.click();
  }

  async navigateToSettingsSecurity() {
    await this.settingsSecurityLink.click();
  }

  async acceptCookies() {
    if (await this.cookieAcceptButton.isVisible()) {
      await this.cookieAcceptButton.click();
    }
  }

  async optOutCookies() {
    if (await this.cookieOptOutButton.isVisible()) {
      await this.cookieOptOutButton.click();
    }
  }

  async collapseSidebar() {
    await this.sidebarCollapse.click();
  }

  async openSearch() {
    await this.searchButton.click();
  }

  async openUserMenu() {
    await this.userMenuButton.click();
  }

  async verifyPageTitle(expectedTitle: string) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async verifyUrl(expectedUrl: string) {
    await expect(this.page).toHaveURL(expectedUrl);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
  }
}
