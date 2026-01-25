describe('Saucedemo Tests', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
  });

  it('Test 1: Login with valid credentials', () => {
    cy.login('standard_user', 'secret_sauce');
    
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('be.visible').and('have.text', 'Products');
    cy.get('.shopping_cart_link').should('be.visible');
    cy.get('.inventory_item').should('have.length', 6);
    
    cy.screenshot('successful-login');
  });

  it('Test 2: Show error with invalid credentials', () => {
    cy.get('[data-test="username"]').type('invalid_user');
    cy.get('[data-test="password"]').type('wrong_password');
    cy.get('[data-test="login-button"]').click();
    
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match');
    
    cy.screenshot('login-error');
  });

  it('Test 3: Add item to cart', () => {
    cy.login('standard_user', 'secret_sauce');
    
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    cy.get('.shopping_cart_badge')
      .should('be.visible')
      .and('have.text', '1');
    
    cy.get('.shopping_cart_link').click();
    
    cy.url().should('include', '/cart.html');
    cy.get('.cart_item').should('have.length', 1);
    cy.get('.inventory_item_name')
      .should('be.visible')
      .and('contain', 'Sauce Labs Backpack');
    cy.get('.inventory_item_price')
      .should('be.visible')
      .and('contain', '$29.99');
    
    cy.screenshot('cart-with-item');
  });

  it('Test 4: Open product details and verify information', () => {
    cy.login('standard_user', 'secret_sauce');
    
    cy.get('[data-test="item-4-title-link"]').click();
    
    cy.url().should('include', '/inventory-item.html?id=4');
    cy.get('.inventory_details_name')
      .should('be.visible')
      .and('contain', 'Sauce Labs Backpack');
    cy.get('.inventory_details_desc')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('.inventory_details_price')
      .should('be.visible')
      .and('contain', '$29.99');
    cy.get('.btn_inventory').should('be.visible').and('contain', 'Add to cart');
    
    cy.screenshot('product-details');
  });

  it('Test 5: Remove item from cart', () => {
    cy.login('standard_user', 'secret_sauce');
    
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    cy.get('.shopping_cart_badge')
      .should('be.visible')
      .and('have.text', '1');
    
    cy.get('.shopping_cart_link').click();
    cy.get('.cart_item').should('have.length', 1);
    
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    
    cy.get('.cart_item').should('have.length', 0);
    cy.get('.shopping_cart_badge').should('not.exist');
    cy.get('.cart_list').should('be.visible');
    
    cy.screenshot('empty-cart');
  });
});