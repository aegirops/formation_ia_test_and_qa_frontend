Feature: Dashboard Inbox
    As a user
    I want to view email details in the inbox
    So that I can read and manage my emails effectively

    Background:
        Given I am on the dashboard application at "http://localhost:3000"

    Scenario: Successfully display detailed email information
        Given I navigate to the inbox page
        When I click on the inbox menu
        Then I should see the inbox page with "20" total emails
        And I should see the "All" tab is selected
        And I should see the "Unread" tab is available

    Scenario: View first email details with complete information
        Given I am on the inbox page
        When I click on the first email from "Alex Smith"
        Then I should see the email details panel
        And I should see the email sender as "Alex Smith"
        And I should see the email address as "alex.smith@example.com"
        And I should see the email subject as "Meeting Schedule: Q1 Marketing Strategy Review"
        And I should see the email date as "08 Sep 19:40"
        And I should see the email content contains "Q1 Marketing Strategy meeting"
        And I should see the email content contains "Conference Room A"
        And I should see the email content contains "10 AM EST"
        And I should see the sender's profile image
        And I should see reply functionality is available

    Scenario: Verify email content structure and formatting
        Given I am viewing the first email details
        Then I should see the email content is properly formatted
        And I should see the agenda items are listed:
            | Agenda Item              |
            | Q4 Performance Review    |
            | New Campaign Proposals   |
            | Budget Allocation for Q2 |
            | Team Resource Planning   |
        And I should see the sender's contact information "Tel: (555) 123-4567"

    Scenario: Verify reply interface functionality
        Given I am viewing the first email details
        When I focus on the reply textbox
        Then I should see the reply textbox is editable
        And I should see the "Send" button is available
        And I should see the "Save draft" button is available
        And I should see the reply is addressed to "alex.smith@example.com"

    Scenario: Navigate back to inbox from email details
        Given I am viewing an email in detail view
        When I click the back button
        Then I should return to the inbox list
        And I should see all emails in the list
        And the previously viewed email should still be visible

    Scenario Outline: Verify multiple emails display correctly
        Given I am on the inbox page
        When I click on the email from "<sender>"
        Then I should see the email sender as "<sender>"
        And I should see the email subject as "<subject>"
        And I should see the email date as "<date>"

        Examples:
            | sender       | subject                                        | date   |
            | Alex Smith   | Meeting Schedule: Q1 Marketing Strategy Review | 08 Sep |
            | Jordan Brown | RE: Project Phoenix - Sprint 3 Update          | 08 Sep |
            | Taylor Green | Lunch Plans                                    | 08 Sep |
            | Morgan White | New Proposal: Project Horizon                  | 07 Sep |
