# Playwright Page Object Model (POM) Test Suite

This test suite implements the Page Object Model (POM) architecture for testing the [Nuxt Dashboard Template](https://dashboard-template.nuxt.dev/).

## Architecture Overview

The POM architecture separates the test logic from the page-specific logic, making tests more maintainable and reusable.

### Directory Structure

```
e2e/
├── pages/           # Page Object classes
│   ├── BasePage.ts      # Base class with common elements
│   ├── HomePage.ts      # Home/Dashboard page
│   ├── InboxPage.ts     # Inbox page
│   ├── CustomersPage.ts # Customers page
│   ├── SettingsPage.ts  # Settings page
│   └── index.ts         # Export all page objects
├── tests/           # Test files
│   ├── home.spec.ts         # Home page tests
│   ├── inbox.spec.ts        # Inbox page tests
│   ├── customers.spec.ts    # Customers page tests
│   ├── settings.spec.ts     # Settings page tests
│   └── navigation.spec.ts   # Cross-page navigation tests
└── README.md        # This file
```

## Page Object Classes

### BasePage

The base class contains common elements and functionality shared across all pages:

- Sidebar navigation (Home, Inbox, Customers, Settings)
- Header elements (Search, User menu, Collapse sidebar)
- Cookie banner handling
- Common navigation methods
- URL and title verification methods

### HomePage

Handles the dashboard/home page functionality:

- Stats cards (Customers, Conversions, Revenue, Orders)
- Revenue chart
- Orders table
- Date range picker
- Period selector
- Navigation to other sections via stats cards

### InboxPage

Manages the inbox/email functionality:

- Email list display
- Tab switching (All/Unread)
- Email selection and interaction
- Email content verification
- Search and filtering capabilities

### CustomersPage

Handles customer management features:

- Customer table with pagination
- Search and filtering
- Customer selection (individual and bulk)
- Status filtering
- CRUD operations (New customer, Delete)
- Table data extraction and verification

### SettingsPage

Manages settings and profile functionality:

- Settings navigation (General, Members, Notifications, Security)
- Profile form fields (Name, Email, Username, Bio, Avatar)
- Form validation and submission
- Field value management
- Settings subsection navigation

## Test Files

### home.spec.ts

Tests for the home/dashboard page:

- Page loading and structure verification
- Stats cards display and data validation
- Chart and table functionality
- Navigation between sections
- Interactive elements (date picker, period selector)

### inbox.spec.ts

Tests for the inbox functionality:

- Email list display and structure
- Tab switching between All/Unread
- Email interaction and selection
- Content verification and search
- Email data extraction

### customers.spec.ts

Tests for customer management:

- Table structure and data display
- Search and filtering functionality
- Customer selection and bulk operations
- Pagination handling
- CRUD operations
- Data validation and verification

### settings.spec.ts

Tests for settings and profile management:

- Form display and validation
- Field interaction and data entry
- Settings navigation between subsections
- Profile data persistence
- Form submission and validation

### navigation.spec.ts

Integration tests for cross-page navigation:

- Complete navigation flow between all pages
- Sidebar consistency across pages
- Active state verification
- External link handling
- Cookie banner persistence
- Page refresh handling

## Key Features

### 1. Inheritance Structure

All page classes inherit from `BasePage`, providing:

- Common navigation elements
- Shared utility methods
- Consistent interaction patterns

### 2. Locator Management

Each page object encapsulates its own locators:

- Semantic element selection using roles and text
- Robust selectors that are less brittle
- Organized locator grouping by functionality

### 3. Action Methods

Page objects provide high-level action methods:

- `navigateToX()` methods for navigation
- `fillX()` methods for form interactions
- `verifyX()` methods for assertions
- `getX()` methods for data extraction

### 4. Verification Methods

Built-in verification methods for:

- Page loading and structure
- Data validation
- Element visibility and state
- URL and title verification

### 5. Data Extraction

Methods to extract and validate data:

- Table data extraction
- Form value retrieval
- Dynamic content verification
- List and collection handling

## Usage Examples

### Basic Page Navigation

```typescript
const homePage = new HomePage(page);
await homePage.goto();
await homePage.acceptCookies();
await homePage.verifyPageLoaded();

await homePage.navigateToCustomers();
const customersPage = new CustomersPage(page);
await customersPage.verifyPageLoaded();
```

### Form Interaction

```typescript
const settingsPage = new SettingsPage(page);
await settingsPage.goto();

await settingsPage.fillCompleteProfile({
  name: "John Doe",
  email: "john@example.com",
  username: "johndoe",
  bio: "Software developer",
});

await settingsPage.saveChanges();
```

### Table Operations

```typescript
const customersPage = new CustomersPage(page);
await customersPage.goto();

await customersPage.searchCustomers("Alex Smith");
await customersPage.selectCustomerByIndex(0);
await customersPage.clickDeleteButton();
```

### Data Validation

```typescript
const homePage = new HomePage(page);
await homePage.goto();

const customersValue = await homePage.getCustomersValue();
const customersChange = await homePage.getCustomersChange();

expect(customersValue).toBeTruthy();
expect(customersChange).toMatch(/[+-]\d+%/);
```

## Best Practices Implemented

1. **Single Responsibility**: Each page object handles only its own page
2. **DRY Principle**: Common functionality is inherited from BasePage
3. **Descriptive Naming**: Clear, descriptive method and property names
4. **Robust Selectors**: Using semantic selectors (roles, text) over CSS selectors
5. **Async/Await**: Proper handling of asynchronous operations
6. **Error Handling**: Built-in verification methods for robust testing
7. **Modularity**: Organized structure with clear separation of concerns

## Running Tests

```bash
# Run all tests
npx playwright test e2e/

# Run specific test file
npx playwright test e2e/tests/home.spec.ts

# Run tests in headed mode
npx playwright test e2e/ --headed

# Run tests with UI
npx playwright test e2e/ --ui
```

## Configuration

The tests are configured to work with the existing Playwright configuration in the project. Make sure to:

1. Install dependencies: `npm install`
2. Install browsers: `npx playwright install`
3. Run tests: `npx playwright test e2e/`

## Maintenance

When the application changes:

1. **UI Changes**: Update locators in the relevant page object
2. **New Features**: Add new methods to the appropriate page object
3. **New Pages**: Create new page object classes following the same pattern
4. **Common Changes**: Update BasePage for changes affecting all pages

This POM architecture provides a solid foundation for scalable, maintainable end-to-end testing of the Nuxt Dashboard Template.
