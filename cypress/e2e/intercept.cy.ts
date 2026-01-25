describe('Mock value', () => {
  const baseUrl = 'https://pu5hds6usi.execute-api.us-east-1.amazonaws.com/mocks';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('Test 1: Intercept GET request and verify response', () => {
    cy.intercept('GET', '**/mocks*').as('getMocks');
    cy.reload();
    
    cy.wait('@getMocks').then((interception) => {
      expect(interception.response!.statusCode).to.eq(200);
      expect(interception.response!.body).to.exist;
    });
    
  });

  it('Test 2: Server error', () => {
    cy.intercept('GET', '**/mocks*', {
      statusCode: 500,
      body: {
        error: 'Internal Server Error'
      }
    }).as('errorRequest');
    cy.reload();
    
    cy.wait('@errorRequest').then((interception) => {
      expect(interception.response).to.exist;
      expect(interception.response!.statusCode).to.eq(500);
      expect(interception.response!.body.error).to.exist;
    });
    
  });
});