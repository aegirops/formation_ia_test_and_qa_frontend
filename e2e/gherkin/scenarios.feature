Feature: Nuxt Dashboard Template Exploration
    As a user of the dashboard template
    I want to explore all the main features and functionality
    So that I can understand the complete system capabilities

    Background:
        Given I am on the Nuxt Dashboard Template website
        And the page loads successfully with all components

    @navigation @smoke
    Scenario: Navigate through main sections
        When I click on the "Home" navigation link
        Then I should be on the home page
        And I should see the dashboard with stats cards
        When I click on the "Inbox" navigation link
        Then I should be on the inbox page
        And I should see email messages
        When I click on the "Customers" navigation link
        Then I should be on the customers page
        And I should see a customer data table
        When I expand the "Settings" menu
        Then I should see all settings subsections

    @homepage @dashboard
    Scenario: Home page dashboard functionality
        Given I am on the home page
        When I view the stats cards
        Then I should see "Customers" card with count and percentage change
        And I should see "Conversions" card with count and percentage change
        And I should see "Revenue" card with amount and percentage change
        And I should see "Orders" card with count and percentage change
        And I should see a revenue chart with data visualization
        And I should see a transactions table with recent orders

    @homepage @daterange
    Scenario: Date range picker functionality
        Given I am on the home page
        When I click on the date range picker button
        Then I should see a date range selection modal
        And I should see predefined options like "Last 7 days", "Last 14 days", "Last 30 days"
        And I should see a calendar interface for custom date selection
        When I select "Last 30 days"
        Then the dashboard data should update to reflect the new date range
        And the stats cards should show updated values
        And the revenue chart should display data for the selected period

    @homepage @period
    Scenario: Period selector functionality
        Given I am on the home page
        When I click on the period selector dropdown
        Then I should see options for "daily" and "weekly"
        When I select "weekly"
        Then the revenue chart should update to show weekly data points
        And the chart x-axis labels should change to weekly intervals

    @inbox @email
    Scenario: Inbox email management
        Given I am on the inbox page
        Then I should see a list of email messages
        And I should see tabs for "All" and "Unread"
        And the inbox should show total count in the header
        When I click on the "Unread" tab
        Then I should see only unread messages
        And the count should update to show unread count
        When I click on an email message
        Then I should see the email detail view
        And I should see sender information and timestamp
        And I should see a reply interface with text input
        And I should see "Save draft" and "Send" buttons

    @customers @datatable
    Scenario: Customer management interface
        Given I am on the customers page
        Then I should see a customer data table
        And I should see columns for ID, Name, Email, Location, and Status
        And I should see customer avatars and profile information
        And I should see a search/filter input field
        And I should see bulk selection checkboxes
        And I should see pagination controls
        And I should see a "New customer" button
        When I click the "New customer" button
        Then I should see a modal dialog for adding a new customer
        And I should see form fields for Name and Email
        And I should see "Cancel" and "Create" buttons

    @customers @filtering
    Scenario: Customer table filtering and selection
        Given I am on the customers page
        When I select one or more customers using checkboxes
        Then I should see the selection count update
        And I should see a "Delete" button with the count
        When I use the filter dropdown
        Then I should see filtering options
        When I use the search field
        Then I should be able to filter customers by text

    @settings @profile
    Scenario: General settings management
        Given I am on the settings page
        When I navigate to "General" settings
        Then I should see profile form fields
        And I should see fields for Name, Email, Username
        And I should see an avatar upload section
        And I should see a bio text field
        And I should see a "Save changes" button
        And all form fields should be pre-populated with current values

    @settings @team
    Scenario: Team member management
        Given I am on the settings page
        When I navigate to "Members" settings
        Then I should see a list of team members
        And I should see member avatars, names, and usernames
        And I should see role dropdowns for each member (owner/member)
        And I should see an "Invite people" button
        And I should see a search field for finding members
        And I should see action buttons for each member

    @settings @notifications
    Scenario: Notification preferences
        Given I am on the settings page
        When I navigate to "Notifications" settings
        Then I should see notification channel options
        And I should see toggles for "Email" and "Desktop" notifications
        And I should see account update preferences
        And I should see toggles for "Weekly digest", "Product updates", and "Important updates"
        And some toggles should be enabled by default
        When I toggle a notification setting
        Then the setting should update accordingly

    @settings @security
    Scenario: Security settings management
        Given I am on the settings page
        When I navigate to "Security" settings
        Then I should see a password change section
        And I should see fields for "Current password" and "New password"
        And I should see an "Update" button for password changes
        And I should see an account deletion section
        And I should see a warning about irreversible account deletion
        And I should see a "Delete account" button

    @responsive @ui
    Scenario: User interface and responsive design
        Given I am on any page of the dashboard
        Then I should see a consistent navigation sidebar
        And I should see the Nuxt logo and branding
        And I should see a search bar with keyboard shortcut indicator
        And I should see user profile information in the sidebar
        And I should see "Feedback" and "Help & Support" links
        And I should see a collapsible sidebar button
        When I interact with any interactive element
        Then it should provide appropriate visual feedback

    @integration @workflow
    Scenario: Complete user workflow
        Given I am a new user exploring the dashboard
        When I start on the home page
        Then I should see an overview of key metrics
        When I want to check my messages
        Then I can navigate to the inbox and read emails
        When I need to manage customers
        Then I can view, search, and add new customers
        When I want to configure my account
        Then I can access all settings sections
        And I can update my profile, manage team members, set notifications, and security preferences
        And all navigation should be intuitive and consistent throughout the application
