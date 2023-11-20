import 'cypress-file-upload';

describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Visits the initial and submit the form', () => {
    cy.intercept('POST', 'http://localhost:8080/sendDocument', (req) => {
      req.reply({
        statusCode: 200,
        body: { message: 'document is sent' },
      });
    }).as('sendDocument');

    cy.fixture('file.txt').then((fileContent) => {
      cy.get('[formControlName="fileDocument"]').attachFile(
        {
          fileContent,
          fileName: 'example.txt',
          mimeType: 'text/plain',
          encoding: 'utf-8',
        },
        { subjectType: 'drag-n-drop' },
      );
    });

    cy.get('[formcontrolname="emailStudent"]').type('student@edusign.fr');

    cy.get('[formcontrolname="emailsExternals"]').click();
    cy.get('[formcontrolname="emailsExternals"]').type(
      'intervenant1@edusign.fr{enter}',
    );
    cy.get('[formcontrolname="emailsExternals"]').type(
      'intervenant2@edusign.fr{enter}',
    );

    cy.get('button[type="submit"]').click({ force: true });

    cy.get('.ant-notification-notice').should('exist');
  });

  it('should mark all form controls as touched when the form is invalid', () => {
    cy.get('button[type="submit"]').click({ force: true });

    cy.get('.ant-form-item-explain-error').each(($errorItem) => {
      const errorMessage = $errorItem.text().trim();

      expect(errorMessage).to.not.be.empty;
    });
  });
});
