/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //open issue detail modal with title from line 16  
    cy.contains(issueTitle).click();
    });
  });

  //issue title, that we are testing with, saved into variable
  const issueTitle = 'This is an issue of type: Task.';

  it('Should delete issue successfully', () => {
    //deleting issue
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
    //Assert that deleted issue is not in the list.
    IssueModal.ensureIssueIsNotVisibleOnBoard(issueTitle)    
  });

  it('Should cancel deletion process successfully', () => {
    //Start deleting ang cancel it.
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    //Close issue detail view.
    IssueModal.closeDetailModal();
    //Assert that issue is still in the list.
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle)

  });
});
