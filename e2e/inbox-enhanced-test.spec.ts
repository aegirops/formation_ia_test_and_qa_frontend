import { test, expect } from "@playwright/test";

test.describe("Inbox Email Management", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application and handle cookie consent
    await page.goto("/");
    await page.getByRole("button", { name: "Accept" }).click();
    await page.getByRole("link", { name: "Inbox" }).click();
  });

  test("should display inbox with all emails and proper counts", async ({
    page,
  }) => {
    // Verify inbox header and total email count
    await expect(page.getByRole("heading", { name: "Inbox" })).toBeVisible();
    await expect(page.locator('text="20"')).toBeVisible();

    // Verify tabs are present and "All" is selected by default
    await expect(page.getByRole("tab", { name: "All" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "All" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    await expect(page.getByRole("tab", { name: "Unread" })).toBeVisible();

    // Verify first few emails are visible
    await expect(page.getByTestId("email-item-1")).toBeVisible();
    await expect(page.getByTestId("email-item-2")).toBeVisible();
    await expect(page.getByTestId("email-item-3")).toBeVisible();
  });

  test("should display Alex Smith email details correctly", async ({
    page,
  }) => {
    // Click on the first email from Alex Smith
    await page.getByTestId("email-item-1").click();

    // Wait for email details panel to be visible
    await page.getByTestId("email-details-panel").waitFor({ state: "visible" });

    // Verify sender information
    await expect(
      page.getByText("alex.smith@example.com", { exact: true })
    ).toBeVisible();
    await expect(page.getByTestId("reply-header")).toBeVisible();

    // Verify email subject
    await expect(
      page.getByRole("heading", {
        name: "Meeting Schedule: Q1 Marketing Strategy Review",
      })
    ).toBeVisible();

    // Verify email content contains key information
    await expect(page.getByTestId("email-details-panel")).toContainText(
      "Q1 Marketing Strategy meeting"
    );
    await expect(page.getByTestId("email-details-panel")).toContainText(
      "Conference Room A"
    );
    await expect(page.getByTestId("email-details-panel")).toContainText(
      "10 AM EST"
    );
    await expect(page.getByTestId("email-details-panel")).toContainText(
      "Tel: (555) 123-4567"
    );

    // Verify agenda items are present
    await expect(page.getByTestId("email-details-panel")).toContainText(
      "Q4 Performance Review"
    );
    await expect(page.getByTestId("email-details-panel")).toContainText(
      "New Campaign Proposals"
    );
    await expect(page.getByTestId("email-details-panel")).toContainText(
      "Budget Allocation for Q2"
    );
    await expect(page.getByTestId("email-details-panel")).toContainText(
      "Team Resource Planning"
    );

    // Verify sender's profile image is displayed
    await expect(page.getByAltText("Alex Smith")).toBeVisible();
  });

  test("should handle reply functionality correctly", async ({ page }) => {
    // Navigate to first email
    await page.getByTestId("email-item-1").click();
    await page.getByTestId("email-details-panel").waitFor({ state: "visible" });

    // Verify reply section is available
    await expect(page.getByTestId("reply-section")).toBeVisible();
    await expect(page.getByTestId("reply-header")).toContainText(
      "Reply to Alex Smith (alex.smith@example.com)"
    );

    // Test reply functionality
    const replyText =
      "Thank you for the reminder, Alex! I'll be there with my department updates. Looking forward to the meeting.";
    await page.getByTestId("reply-textarea").fill(replyText);

    // Verify buttons are available
    await expect(page.getByTestId("save-draft-button")).toBeVisible();
    await expect(page.getByTestId("send-button")).toBeVisible();
    await expect(page.getByTestId("attach-file-button")).toBeVisible();

    // Send the reply
    await page.getByTestId("send-button").click();

    // Wait for success notification (with longer timeout since it might take time)
    await expect(page.getByText('Notification [ "Email sent')).toBeVisible({
      timeout: 10000,
    });
    await expect(
      page.getByText("Your email has been sent successfully", { exact: true })
    ).toBeVisible({ timeout: 10000 });
  });

  test("should navigate between emails correctly", async ({ page }) => {
    // Test navigation to first email
    await page.getByTestId("email-item-1").click();
    await page.getByTestId("email-details-panel").waitFor({ state: "visible" });
    await expect(
      page.getByText("alex.smith@example.com", { exact: true })
    ).toBeVisible();

    // Navigate back to inbox
    await page.getByTestId("email-navbar").getByRole("button").first().click();
    await expect(page.getByTestId("email-item-1")).toBeVisible();

    // Test navigation to second email
    await page.getByTestId("email-item-2").click();
    await page.getByTestId("email-details-panel").waitFor({ state: "visible" });
    await expect(page.getByTestId("reply-header")).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "RE: Project Phoenix - Sprint 3 Update",
      })
    ).toBeVisible();

    // Verify Jordan Brown's email content
    await expect(page.getByTestId("email-details-panel")).toContainText(
      "Sprint 3 deliverables"
    );
    await expect(page.getByTestId("email-details-panel")).toContainText(
      "Code coverage: 94%"
    );
    await expect(page.getByTestId("email-details-panel")).toContainText(
      "Mobile: +1 (555) 234-5678"
    );
  });

  test("should filter unread emails correctly", async ({ page }) => {
    // Verify initial state - All tab shows 20 emails
    await expect(page.getByRole("tab", { name: "All" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    await expect(page.locator('text="20"')).toBeVisible();

    // Click on Unread tab
    await page.getByRole("tab", { name: "Unread" }).click();

    // Verify Unread tab is now selected and shows 4 emails
    await expect(
      page.locator("#dashboard-panel-inbox-1").getByText("4", { exact: true })
    ).toBeVisible();
    await expect(page.locator("#dashboard-panel-inbox-1")).toContainText("4");

    // Verify unread emails are visible
    await expect(page.getByTestId("email-item-2")).toBeVisible(); // Jordan Brown
    await expect(page.getByTestId("email-item-3")).toBeVisible(); // Taylor Green
    await expect(page.getByTestId("email-item-8")).toBeVisible(); // Kelly Wilson
    await expect(page.getByTestId("email-item-11")).toBeVisible(); // Morgan Anderson

    // Switch back to All tab
    await page.getByRole("tab", { name: "All" }).click();
    await expect(page.locator('text="20"')).toBeVisible();
  });

  test("should display multiple email details correctly", async ({ page }) => {
    // Test cases for different emails based on the enhanced feature file
    const emailTests = [
      {
        testId: "email-item-1",
        sender: "Alex Smith",
        email: "alex.smith@example.com",
        subject: "Meeting Schedule: Q1 Marketing Strategy Review",
        contentSnippets: [
          "Q1 Marketing Strategy",
          "Conference Room A",
          "10 AM EST",
        ],
      },
      {
        testId: "email-item-2",
        sender: "Jordan Brown",
        email: "jordan.brown@example.com",
        subject: "RE: Project Phoenix - Sprint 3 Update",
        contentSnippets: [
          "Sprint 3 deliverables",
          "Code coverage: 94%",
          "Lead Developer",
        ],
      },
      {
        testId: "email-item-3",
        sender: "Taylor Green",
        email: "taylor.green@example.com",
        subject: "Lunch Plans",
        contentSnippets: ["Mexican restaurant", "La Casa", "12:30 PM"],
      },
    ];

    for (const emailTest of emailTests) {
      // Navigate to specific email
      await page.getByTestId(emailTest.testId).click();
      await page
        .getByTestId("email-details-panel")
        .waitFor({ state: "visible" });

      // Verify sender details
      await expect(
        page.getByText(emailTest.email, { exact: true })
      ).toBeVisible();

      // Verify subject
      await expect(
        page.getByRole("heading", { name: emailTest.subject })
      ).toBeVisible();

      // Verify content snippets
      for (const snippet of emailTest.contentSnippets) {
        await expect(page.getByTestId("email-details-panel")).toContainText(
          snippet
        );
      }

      // Navigate back to inbox for next test
      await page
        .getByTestId("email-navbar")
        .getByRole("button")
        .first()
        .click();
      await expect(page.getByTestId(emailTest.testId)).toBeVisible();
    }
  });

  test("should handle email interactions with proper timing", async ({
    page,
  }) => {
    // Test with proper waitFor patterns for timing-sensitive operations
    await page.getByTestId("email-item-1").click();

    // Wait for all key elements to be visible before proceeding
    await Promise.all([
      page.getByTestId("email-details-panel").waitFor({ state: "visible" }),
      page
        .getByText("alex.smith@example.com", { exact: true })
        .waitFor({ state: "visible" }),
      page.getByTestId("reply-section").waitFor({ state: "visible" }),
    ]);

    // Test reply with proper timing
    await page.getByTestId("reply-textarea").fill("Test reply message");

    // Ensure send button is enabled before clicking
    await expect(page.getByTestId("send-button")).toBeEnabled();
    await page.getByTestId("send-button").click();

    // Wait for notification with extended timeout
    await page
      .getByText('Notification [ "Email sent')
      .waitFor({ state: "visible", timeout: 15000 });

    // Test navigation back with proper timing
    await page.getByTestId("email-navbar").getByRole("button").first().click();
    await page.getByTestId("email-item-1").waitFor({ state: "visible" });

    // Verify we're back in the inbox list
    await expect(page.getByRole("heading", { name: "Inbox" })).toBeVisible();
    await expect(page.getByTestId("email-item-2")).toBeVisible();
  });
});
