Feature: Add Comment
	In order to add a comment to a contribution
	As a user
	I want to be able to type in a "message" box
	
	Scenario: Successful user creation
		Given I have given my full name as "Jaime Bueza"
		And I have entered my email address as "jbueza@gmail.com"
		When I POST to the web service
		Then the resulting response should say "success"