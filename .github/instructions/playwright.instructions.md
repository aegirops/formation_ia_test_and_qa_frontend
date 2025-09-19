---
applyTo: "e2e/*.spec.ts,e2e/**/*.spec.ts"
---

# Playwright UI Testing Architecture and Format

## Rules

- Test files must end with `.spec.ts` suffix and be located in the `e2e` directory or its subdirectories
- Playwright Tests must use POM (Page Object Model) architecture
- Each test file should correspond to a specific feature or page of the application
- Test files should be organized in a way that reflects the application's structure
- Use descriptive names for test files that clearly indicate their purpose
