Feature: Follow User
	In order to follow a user
	As a user
	I want to be able to POST to /api/user/{UserId}/follow
	
	Scenario: Successful follow
		Given I have given my userId
		When I POST to the web service
		Then the resulting response should say "success"