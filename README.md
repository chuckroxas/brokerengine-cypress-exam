# BrokerEngine Cypress Exam

This is a public repository used by **BrokerEngine** for evaluating candidates using Cypress.

The app to be tested is a basic To-Do List application written in React with local storage caching.

## Setup

1. Install NodeJS
2. Clone or fork this repository (https://bitbucket.org/brokerengine/brokerengine-cypress-exam/)
3. Run `npm install` on project root to install the required dependencies
4. You're ready to begin

## Starting the server and writing tests

The dev server should be started before running Cypress tests.

1. Run `npm run start` to start the dev server
2. Open the app at http://localhost:3000 to make sure it's working
3. Run `npm run cypress` on a separate terminal to open the Cypress test runner
4. Open `cypress/integration/todo.spec.js` on your favorite editor and start writing tests

## Notes

* Test basic **CRUD** operations
* Test the **Randomizer** - bonus points for asserting the exact content of the API response being added properly on the view
* Write as many tests as you may see fit
* Arbitrary wait times using `cy.wait` is prohibited (e.g. `cy.wait(1000)`)
* Feel free to add additional selectors to the app `src/` if needed
* __To submit, send us a link to your repository!__
