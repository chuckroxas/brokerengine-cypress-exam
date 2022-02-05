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

});
