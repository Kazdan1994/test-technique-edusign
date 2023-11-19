import 'cypress-file-upload';

describe('My First Test', () => {
  it('Visits the initial and submit the form', () => {
    cy.visit('/');

    cy.fixture('file.txt').then((fileContent) => {
      cy.get('[formControlName="file"]').attachFile(
        {
          fileContent,
          fileName: 'example.txt',
          mimeType: 'text/plain',
          encoding: 'utf-8',
        },
        { subjectType: 'drag-n-drop' },
      );
    });

    cy.get('[formcontrolname="emailEtudiant"]').type('student@edusign.fr');

    cy.get('[formcontrolname="emailsIntervenants"]').click();
    cy.get('[formcontrolname="emailsIntervenants"]').type(
      'intervenant1@edusign.fr{enter}',
    );
    cy.get('[formcontrolname="emailsIntervenants"]').type(
      'intervenant2@edusign.fr{enter}',
    );

    cy.get('button[type="submit"]').click({ force: true });
  });
});