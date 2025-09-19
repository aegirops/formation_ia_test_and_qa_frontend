Feature: Dashboard Inbox

    Scenario: Successful display an email in the inbox
        Given I navigate to http://localhost:3000
        When I click on the inbox menu
        And I click on the first email
        Then I should see the email details