import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  readonly pageHeading: Locator;
  readonly dateRangePicker: Locator;
  readonly periodSelector: Locator;

  // Stats cards
  readonly customersCard: Locator;
  readonly customersValue: Locator;
  readonly customersChange: Locator;
  readonly conversionsCard: Locator;
  readonly conversionsValue: Locator;
  readonly conversionsChange: Locator;
  readonly revenueCard: Locator;
  readonly revenueValue: Locator;
  readonly revenueChange: Locator;
  readonly ordersCard: Locator;
  readonly ordersValue: Locator;
  readonly ordersChange: Locator;

  // Revenue chart
  readonly revenueChartTitle: Locator;
  readonly revenueChartValue: Locator;
  readonly revenueChart: Locator;

  // Orders table
  readonly ordersTable: Locator;
  readonly tableHeaders: Locator;
  readonly tableRows: Locator;

  constructor(page: Page) {
    super(page);

    this.pageHeading = page.getByRole("heading", { name: "Home", level: 1 });
    this.dateRangePicker = page.getByRole("button", {
      name: /Sep \d+, \d+ - Sep \d+, \d+/,
    });
    this.periodSelector = page
      .getByRole("combobox")
      .filter({ hasText: "daily" });

    // Stats cards
    this.customersCard = page
      .locator("div")
      .filter({ hasText: /^Customers\d+/ })
      .first();
    this.customersValue = this.customersCard
      .locator("div")
      .filter({ hasText: /^\d+$/ })
      .first();
    this.customersChange = this.customersCard
      .locator("div")
      .filter({ hasText: /[+-]\d+%/ })
      .first();

    this.conversionsCard = page
      .locator("div")
      .filter({ hasText: /^Conversions\d+/ })
      .first();
    this.conversionsValue = this.conversionsCard
      .locator("div")
      .filter({ hasText: /^\d+$/ })
      .first();
    this.conversionsChange = this.conversionsCard
      .locator("div")
      .filter({ hasText: /[+-]\d+%/ })
      .first();

    this.revenueCard = page
      .locator("div")
      .filter({ hasText: /^Revenue\$/ })
      .first();
    this.revenueValue = this.revenueCard
      .locator("div")
      .filter({ hasText: /^\$[\d,]+$/ })
      .first();
    this.revenueChange = this.revenueCard
      .locator("div")
      .filter({ hasText: /[+-]\d+%/ })
      .first();

    this.ordersCard = page
      .locator("div")
      .filter({ hasText: /^Orders\d+/ })
      .first();
    this.ordersValue = this.ordersCard
      .locator("div")
      .filter({ hasText: /^\d+$/ })
      .first();
    this.ordersChange = this.ordersCard
      .locator("div")
      .filter({ hasText: /[+-]\d+%/ })
      .first();

    // Revenue chart
    this.revenueChartTitle = page
      .locator("p")
      .filter({ hasText: "Revenue" })
      .first();
    this.revenueChartValue = page
      .locator("p")
      .filter({ hasText: /^\$[\d,]+$/ })
      .first();
    this.revenueChart = page.locator("figure img");

    // Orders table
    this.ordersTable = page.getByRole("table");
    this.tableHeaders = this.ordersTable.locator("thead th");
    this.tableRows = this.ordersTable.locator("tbody tr");
  }

  async goto() {
    await super.goto("https://dashboard-template.nuxt.dev/");
  }

  async verifyPageLoaded() {
    await expect(this.pageHeading).toBeVisible();
    await expect(this.dateRangePicker).toBeVisible();
    await expect(this.periodSelector).toBeVisible();
  }

  async verifyStatsCards() {
    await expect(this.customersCard).toBeVisible();
    await expect(this.conversionsCard).toBeVisible();
    await expect(this.revenueCard).toBeVisible();
    await expect(this.ordersCard).toBeVisible();
  }

  async getCustomersValue(): Promise<string> {
    return (await this.customersValue.textContent()) || "";
  }

  async getCustomersChange(): Promise<string> {
    return (await this.customersChange.textContent()) || "";
  }

  async getConversionsValue(): Promise<string> {
    return (await this.conversionsValue.textContent()) || "";
  }

  async getConversionsChange(): Promise<string> {
    return (await this.conversionsChange.textContent()) || "";
  }

  async getRevenueValue(): Promise<string> {
    return (await this.revenueValue.textContent()) || "";
  }

  async getRevenueChange(): Promise<string> {
    return (await this.revenueChange.textContent()) || "";
  }

  async getOrdersValue(): Promise<string> {
    return (await this.ordersValue.textContent()) || "";
  }

  async getOrdersChange(): Promise<string> {
    return (await this.ordersChange.textContent()) || "";
  }

  async verifyRevenueChart() {
    await expect(this.revenueChartTitle).toBeVisible();
    await expect(this.revenueChartValue).toBeVisible();
    await expect(this.revenueChart).toBeVisible();
  }

  async verifyOrdersTable() {
    await expect(this.ordersTable).toBeVisible();
    await expect(this.tableHeaders).toHaveCount(5); // ID, Date, Status, Email, Amount

    // Verify table headers
    const headers = ["ID", "Date", "Status", "Email", "Amount"];
    for (let i = 0; i < headers.length; i++) {
      await expect(this.tableHeaders.nth(i)).toContainText(headers[i]);
    }
  }

  async getOrdersTableRowCount(): Promise<number> {
    return await this.tableRows.count();
  }

  async getOrderById(orderId: string): Promise<Locator> {
    return this.ordersTable.locator(`tr:has-text("${orderId}")`);
  }

  async clickDateRangePicker() {
    await this.dateRangePicker.click();
  }

  async selectPeriod(period: string) {
    await this.periodSelector.click();
    await this.page.getByRole("option", { name: period }).click();
  }

  async clickStatsCardLink(
    cardType: "customers" | "conversions" | "revenue" | "orders"
  ) {
    const cardLinks = {
      customers: this.customersCard.getByRole("link"),
      conversions: this.conversionsCard.getByRole("link"),
      revenue: this.revenueCard.getByRole("link"),
      orders: this.ordersCard.getByRole("link"),
    };

    await cardLinks[cardType].click();
  }
}
