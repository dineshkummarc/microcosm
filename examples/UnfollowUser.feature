Feature: Unfollow User
	In order to Unfollow a user
	As a user
	I want to be able to POST to /api/user/{UserId}/unfollow
	
	Scenario: Successful unfollow
		Given I have given the userId I wish to unfollow
		When I POST to the web service
		Then the resulting response should say "success"