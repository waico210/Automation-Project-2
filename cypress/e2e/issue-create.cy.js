import { faker } from '@faker-js/faker';
describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //System will already open issue creating modal in beforeEach block  
    cy.visit(url + '/board?modal-issue-create=true');
    });
  });

//ASSIGNMENT 2 Test 1
  it('Create new issue and validate it', () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      
      //Description field
      cy.get('.ql-editor').click().type('My bug description');
            
      //Title field
      cy.get('input[name="title"]').type('Bug');
      
      //Select Pickle Rick from reporter dropdown
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      //Select Pickle Rick from assignee dropdown
      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Pickle Rick"]').click();

      //Selecting Issue type
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Bug"]')
        .trigger('click');
      cy.get('[data-testid="select:type"]').should('contain', 'Bug');

      //Click on button "Create issue"
      cy.get('button[type="submit"]').click();   
    
    });
      //Assert that modal window is closed and successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    
    //Reload the page to be able to see recently created issue
    //Assert that successful message has dissappeared after the reload
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');
  
    //Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      //Assert that this list contains 5 issues and first element with tag p has specified text
      cy.get('[data-testid="list-issue"]')
          .should('have.length', '5')
          .first()
          .find('p')
          .contains('Bug');
      //Assert that correct avatar and type icon are visible
      cy.get('[data-testid="avatar:Pickle Rick"]').should('be.visible');
      cy.get('[data-testid="icon:bug"]').should('be.visible');
    });
 });

//ASSIGNMENT 2 Test 2
  it('Create new issue with random data and validate it', () => {
    const title = faker.lorem.word();
    const description = faker.lorem.sentence(2);
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      //Description field
      cy.get('.ql-editor').type(description);
      //Title field
      cy.get('input[name="title"]').type(title);

      cy.get('[data-testid="select:priority"]').click();
      cy.get('[data-testid="select-option:Low"]').click();

      //Select Baby Yoda from reporter dropdown
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      //Select Baby Yoda from assignee dropdown
      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Baby Yoda"]').click();

      //check if the issue type is a task
      cy.get('[data-testid="select:type"]').should('contain', 'Task');
    
      //Click on button "Create issue"
      cy.get('button[type="submit"]').click();
    
    });
      //Assert that modal window is closed and successful message is visible
      cy.get('[data-testid="modal:issue-create"]').should('not.exist');
      cy.contains('Issue has been successfully created.').should('be.visible');
      
      //Reload the page to be able to see recently created issue
      //Assert that successful message has dissappeared after the reload
      cy.reload();
      cy.contains('Issue has been successfully created.').should('not.exist');
    
      //Assert than only one list with name Backlog is visible and do steps inside of it
      cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
        //Assert that this list contains 5 issues and first element with tag p has specified text
        cy.get('[data-testid="list-issue"]')
            .should('have.length', '5')
            .first()
            .find('p')
            .contains(title);
        //Assert that correct avatar and type icon are visible
        cy.get('[data-testid="avatar:Baby Yoda"]').should('be.visible');
        cy.get('[data-testid="icon:task"]').should('be.visible');
      });
    

  });
});





