Feature: Create User
	In order to create a user
	As a user
	I want to be able to POST to /api/user/create
	
	Scenario: Successful user creation
		Given I have given my full name as "Jaime Bueza"
		And I have entered my email address as "jbueza@gmail.com"
		When I POST to the web service
		Then the resulting response should say "success"