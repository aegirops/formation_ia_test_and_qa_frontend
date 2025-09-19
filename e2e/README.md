# E2E Testing with Playwright - Best Practices Guide

This guide provides essential best practices for writing reliable end-to-end tests with Playwright, focusing on avoiding common click issues and improving test stability.

## 🎯 Locator Strategy Hierarchy

Use locators in this priority order for maximum reliability:

### 1. **BEST: Semantic Locators** (Accessible to users)

```typescript
await page.getByRole("button", { name: "Send" });
await page.getByRole("link", { name: "Inbox" });
await page.getByLabel("Email address");
```

### 2. **GOOD: User-visible Text**

```typescript
await page.getByText("Alex Smith");
await page.getByPlaceholder("Write your reply...");
```

### 3. **ACCEPTABLE: Test IDs** (Current approach)

```typescript
await page.getByTestId("email-item-1");
```

### 4. **AVOID: CSS Selectors, XPath**

```typescript
// Don't use these unless absolutely necessary
await page.locator(".email-item");
await page.locator('xpath=//div[@class="email-item"]');
```

## ⏱️ Wait for Element State (Fixing Click Issues)

The most common cause of click failures is not waiting for elements to be ready. Always ensure elements are actionable:

### ❌ Wrong Way

```typescript
await page.getByTestId("email-item-1").click(); // May fail if element not ready
```

### ✅ Correct Way

```typescript
// Option 1: Explicit wait
await page.getByTestId("email-item-1").waitFor({ state: "visible" });
await page.getByTestId("email-item-1").click();

// Option 2: Using expect (recommended)
await expect(page.getByTestId("email-item-1")).toBeVisible();
await page.getByTestId("email-item-1").click();
```

## 📧 Improved Inbox Test Example

```typescript
import { test, expect } from "@playwright/test";

test("inbox email selection and details", async ({ page }) => {
  // Navigate using relative URL (baseURL configured)
  await page.goto("/");

  // Use semantic locator for navigation
  await page.getByRole("link", { name: "Inbox" }).click();

  // Wait for inbox to load
  await expect(page.getByTestId("email-details-panel")).toBeHidden();

  // Select first email with proper waiting
  const firstEmail = page.getByTestId("email-item-1");
  await expect(firstEmail).toBeVisible();
  await firstEmail.click();

  // Wait for email details to appear
  await expect(page.getByTestId("email-details-panel")).toBeVisible();

  // Verify specific content instead of long text blocks
  await expect(page.getByTestId("email-details-panel")).toContainText(
    "Alex Smith"
  );
  await expect(page.getByTestId("email-details-panel")).toContainText(
    "Meeting Schedule"
  );

  // Select second email
  const secondEmail = page.getByTestId("email-item-2");
  await expect(secondEmail).toBeVisible();
  await secondEmail.click();

  // Verify second email content
  await expect(page.getByTestId("email-details-panel")).toContainText(
    "Jordan Brown"
  );
  await expect(page.getByTestId("email-details-panel")).toContainText(
    "Sprint 3"
  );
});
```

## 🐛 Debugging Click Issues

When clicks don't work, use these debugging techniques:

```typescript
test("debug click issues", async ({ page }) => {
  await page.goto("/inbox");

  const emailItem = page.getByTestId("email-item-1");

  // Check element states
  await expect(emailItem).toBeAttached();
  await expect(emailItem).toBeVisible();
  await expect(emailItem).toBeEnabled();

  // Visual debugging
  await page.screenshot({ path: "before-click.png" });
  await emailItem.highlight();

  // Get element information
  const boundingBox = await emailItem.boundingBox();
  console.log("Element position:", boundingBox);

  // Perform click
  await emailItem.click();

  // Verify result
  await page.screenshot({ path: "after-click.png" });
});
```

## 🔄 Handling Dynamic Content

For dynamic content like email lists:

```typescript
// Wait for specific number of emails
await expect(page.getByTestId(/email-item-\d+/)).toHaveCount(20);

// Wait for first email to appear
await page.getByTestId("email-item-1").waitFor();

// Use flexible locators
const firstEmailInList = page.locator('[data-testid^="email-item-"]').first();
await firstEmailInList.click();
```

## 🎛️ Enhanced Playwright Configuration

Update `playwright.config.ts` for better debugging:

```typescript
export default defineConfig({
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure", // Keep traces on failure
    screenshot: "only-on-failure", // Screenshots on failure
    video: "retain-on-failure", // Videos on failure
  },

  timeout: 30000, // Test timeout
  expect: {
    timeout: 10000, // Assertion timeout
  },
});
```

## 🏗️ Page Object Model (Advanced)

For larger test suites, organize tests with Page Object Model:

```typescript
// pages/inbox-page.ts
export class InboxPage {
  constructor(private page: Page) {}

  async navigateToInbox() {
    await this.page.getByRole("link", { name: "Inbox" }).click();
  }

  async selectEmail(emailId: number) {
    const email = this.page.getByTestId(`email-item-${emailId}`);
    await expect(email).toBeVisible();
    await email.click();
  }

  async expectEmailDetailsVisible(senderName: string) {
    await expect(this.page.getByTestId("email-details-panel")).toContainText(
      senderName
    );
  }
}

// In test file
test("inbox functionality", async ({ page }) => {
  const inboxPage = new InboxPage(page);

  await page.goto("/");
  await inboxPage.navigateToInbox();
  await inboxPage.selectEmail(1);
  await inboxPage.expectEmailDetailsVisible("Alex Smith");
});
```

## ⚠️ Common Click Issues & Solutions

| Issue                 | Cause                       | Solution                                    |
| --------------------- | --------------------------- | ------------------------------------------- |
| Element not found     | Element not loaded yet      | Add `waitFor()` or `expect().toBeVisible()` |
| Element covered       | Another element overlapping | Use `force: true` or scroll into view       |
| Element not clickable | Element disabled or hidden  | Check `toBeEnabled()` and `toBeVisible()`   |
| Timing issues         | Race conditions             | Use auto-waiting with `expect()`            |
| Wrong element clicked | Imprecise locator           | Use more specific locators                  |
| Flaky tests           | Inconsistent element state  | Add proper waits and assertions             |

## 🚀 Component Testing Best Practices

Enhance Vue components for better testability:

```vue
<!-- Add semantic attributes to components -->
<div
  :data-testid="`email-item-${mail.id}`"
  :aria-label="`Email from ${mail.from.name}: ${mail.subject}`"
  role="button"
  tabindex="0"
  @click="selectedMail = mail"
  @keydown.enter="selectedMail = mail"
  @keydown.space="selectedMail = mail"
>
```

This enables semantic locators:

```typescript
await page.getByRole("button", { name: /Email from Alex Smith/ }).click();
```

## 📝 Test Writing Checklist

Before writing tests, ensure:

- [ ] Use semantic locators when possible
- [ ] Add explicit waits for dynamic content
- [ ] Use `expect()` assertions for element states
- [ ] Keep assertions specific and focused
- [ ] Add proper error handling and debugging
- [ ] Use relative URLs with baseURL
- [ ] Structure tests with clear arrange/act/assert pattern

## 🔍 Running and Debugging Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test inbox-record.spec.ts

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run tests in debug mode
npx playwright test --debug

# Generate test report
npx playwright show-report
```

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Best Practices Guide](https://playwright.dev/docs/best-practices)
- [Locators Guide](https://playwright.dev/docs/locators)
- [Auto-waiting](https://playwright.dev/docs/actionability)

---

**Remember**: The key to reliable E2E tests is proper waiting and using the right locators. Always wait for elements to be in the correct state before interacting with them.
