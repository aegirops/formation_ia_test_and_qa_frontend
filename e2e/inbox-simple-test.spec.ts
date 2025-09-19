import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  // Navigate to the home page
  await page.goto("http://localhost:3000/");

  // Wait for the accept button to be visible
  await page.getByRole("button", { name: "Accept" }).click();

  // Wait for the inbox link to be visible
  await page.getByRole("link", { name: "Inbox" }).click();

  // Wait for the email item 1 to be visible
  await page.getByTestId("email-item-1").click();

  // Wait for the email details panel to be visible
  await page.getByTestId("email-details-panel").waitFor({ state: "visible" });

  // Wait for the email details panel to contain the text "alex.smith@example.com"
  await expect(page.getByTestId("email-details-panel")).toContainText(
    "alex.smith@example.com"
  );
});
