context('To-Do List', () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit('/');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('App should load properly', () => {
    cy.title().should('eq', 'To-Do List');
    cy.get('h1').should('contain', 'To-Do List');
    cy.get('form input, form button:contains("Add"), form button:contains("Random")').should('exist');
    cy.contains('No items available');
  });

  /** Start here **/
  it('Create a to-do task', () => {
    cy.get('input').type('Task #1');
    cy.get('[type="submit"]').click();
    cy.get('span').contains('Task #1');
  });

  it('Read newly added to-do task', () => {
    cy.get('span').should('contain','Task #1');
    cy.get('span')
    .invoke('text')
    .then(sometext => cy.log(sometext));
  });

  it('Create a random to-do task', () => {
    cy.get('input').should('have.value', ''); // input field should be empty
    let countOfElements = 0;
      cy.get('.App-list').then($elements => {
      countOfElements = $elements.length;

      return countOfElements
      });
    cy.get('.App-list').should('have.length', 1)
    cy.get('[aria-busy="false"]').click();
    cy.get('[aria-busy="true"]').should('be.visible'); // fetching button should be visible
    cy.wrap(null).then(() => {
      return new Cypress.Promise((resolve, reject) => {
        try {
          fetch('{https://random-data-api.com/api/food/random_food}').then(resolve);
        } catch (e) {
          reject(e);
        }
      })
    })
    // Verify if new random task is existing
    const expectedCount = 2;
    cy.get('.App-list').get('span').should('have.length', expectedCount);

  });
  it('Read created to-do task', () => {
    cy.get('span').first()
      .invoke('text')
      .then(sometext => cy.log(sometext));
  });
  it('Edit and Cancel edit of created to-do task', () => {
    cy.get('span').first()
      .click()
    cy.get('.inline-form > input').last()
      .clear()
    .type(userTask(), {force: true})
    function userTask() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
        for (var i = 0; i < 10; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return text;
    }
    cy.get('button').contains('Cancel').should('be.visible')
      .click()
  });
  it('Edit and Save edit of created to-do task', () => {
    cy.get('input').type('Task #2');
    cy.get('[type="submit"]').click();
    cy.get('span').contains('Task #2')
      .click()
    cy.get('.inline-form > input').last()
      .clear()
    .type(userTask(), {force: true})
    function userTask() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
        for (var i = 0; i < 10; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return text;
    }
    cy.get('button').contains('Save').should('be.visible')
      .click()
  });
  it('Read newly added random to-do task', () => {
    cy.get('span').last()
      .invoke('text')
      .then(sometext => cy.log(sometext));
      
      
  });
  it('Edit and Cancel edit of randomly created to-do task', () => {
    cy.get('span').last()
      .click()
    cy.get('.inline-form > input').last()
      .clear()
    .type(userTask(), {force: true})
    function userTask() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
        for (var i = 0; i < 10; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return text;
    }
    cy.get('button').contains('Cancel').should('be.visible')
      .click()
    cy.get('span').last()
      .then(sometext => {
        let randomText = sometext;
        cy.wrap(randomText).as('randomText')
        // cy.log(sometext)
      })
  });
  it('Edit and Save randomly created to-do task', () => {
    cy.get('[aria-busy="false"]').click();
    cy.get('[aria-busy="true"]').should('be.visible'); // fetching button should be visible
    cy.wrap(null).then(() => {
      return new Cypress.Promise((resolve, reject) => {
        try {
          fetch('{https://random-data-api.com/api/food/random_food}').then(resolve);
        } catch (e) {
          reject(e);
        }
      })
    })
    // Verify if new random task is existing
    const expectedCount = 3;
    cy.get('.App-list').get('span').should('have.length', expectedCount);

    cy.get('span').last()
      .click()
    cy.get('.inline-form > input').last()
      .clear()
    .type(userTask(), {force: true})
    function userTask() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
        for (var i = 0; i < 10; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return text;
    }
    cy.get('button').contains('Save').should('be.visible')
      .click()
  });
  it('Delete a created to-do task', () => {
    cy.contains('Task #1').next('.App-listDelete')
      .click();
  });
  it('Delete a random to-do task', () => {
    cy.get('span').last().next('.App-listDelete')
      .click();
  });

});
