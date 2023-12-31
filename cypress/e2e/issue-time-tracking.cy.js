const title = 'Time Tracking test'
const description = 'This is test issue'
const estimatedHouers = 10
const changedHouers = 20
const timeSpent = 2
const timeRemaining = 5

describe('Time test', () => {
    before(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            //System will already open issue creating modal in beforeEach block  
            cy.visit(url + '/board?modal-issue-create=true');
        });
        cy.get('[data-testid="modal:issue-create"]').within(() => {
            cy.get('.ql-editor').type(description);
            cy.get('input[name="title"]').type(title);
            cy.get('[data-testid="select:priority"]').click();
            cy.get('[data-testid="select-option:Low"]').click();
            cy.get('[data-testid="select:reporterId"]').click();
            cy.get('[data-testid="select-option:Baby Yoda"]').click();
            cy.get('[data-testid="select:userIds"]').click();
            cy.get('[data-testid="select-option:Baby Yoda"]').click();
            cy.get('[data-testid="select:type"]').should('contain', 'Task');
            cy.get('button[type="submit"]').click();
        });
        cy.get('[data-testid="modal:issue-create"]').should('not.exist');
        cy.contains('Issue has been successfully created.').should('be.visible');
        cy.reload();
        cy.contains('Issue has been successfully created.').should('not.exist');
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
            cy.get('[data-testid="list-issue"]')
                .should('have.length', '5')
                .find('p')
                .contains(title);
        });
    });

    it('Time estimation functionality', () => {
        cy.get('[data-testid="list-issue"]').contains(title).click();
        // Assert no time is added
        cy.get('[data-testid="modal:issue-details"]').should("contain", "No time logged");
        // Add 10 hours
        cy.get('[placeholder="Number"]').click().type(estimatedHouers);
        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.get('[data-testid="modal:tracking"]').contains('Done').click();
        cy.get('[data-testid="icon:close"]').eq(0).click();
        // Assert 10 hours is added
        cy.get('[data-testid="list-issue"]').contains(title).click();
        cy.get('[data-testid="modal:issue-details"]').should("contain", estimatedHouers + 'h estimated');
        //Change hours to 20
        cy.get('[placeholder="Number"]').click().clear().type(changedHouers);
        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.get('[data-testid="modal:tracking"]').contains('Done').click();
        cy.get('[data-testid="icon:close"]').eq(0).click();
        // Assert 20 hours is added
        cy.get('[data-testid="list-issue"]').contains(title).click();
        cy.get('[data-testid="modal:issue-details"]').should("contain", changedHouers + 'h estimated');
        // Remove estimation
        cy.get('[placeholder="Number"]').click().clear();
        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.get('[data-testid="modal:tracking"]').contains('Done').click();
        cy.get('[data-testid="icon:close"]').eq(0).click();

        cy.get('[data-testid="list-issue"]').contains(title).click();
        cy.get('[data-testid="modal:issue-details"]').should("contain","No time logged");
        cy.get('input').eq(1).should('have.value', '')
        cy.get('[data-testid="icon:close"]').eq(0).click();
    });
    
    
    it('Time logging functionality', () => {
        // Adding time spent and remaining time
        cy.get('[data-testid="list-issue"]').contains(title).click();
        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.get('[data-testid="modal:tracking"]').should('be.visible');
        cy.get('[placeholder="Number"]').eq(1).click().type(timeSpent);
        cy.get('[placeholder="Number"]').eq(2).click().type(timeRemaining);
        cy.get('button').contains('Done').trigger('mouseover').click();
        cy.get('[data-testid="modal:issue-details"]').should("not.contain", "No time logged");
        cy.get('[data-testid="modal:issue-details"]').should("contain",timeSpent + 'h logged').should('contain',timeRemaining + 'h remaining');
        // Remove logged time
        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.get('[data-testid="modal:tracking"]').should('be.visible');
        cy.get('[placeholder="Number"]').eq(1).click().clear();
        cy.get('[placeholder="Number"]').eq(2).click().clear();
        cy.get('button').contains('Done').trigger('mouseover').click();
        cy.get('[data-testid="modal:issue-details"]').should("contain", "No time logged");
        
    });
});