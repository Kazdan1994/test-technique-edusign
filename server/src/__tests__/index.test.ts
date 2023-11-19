import request from "supertest";
import { faker } from "@faker-js/faker";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  generateSignatories,
  getIntervenants,
  getStudent,
  sendDocuments,
  server,
} from "..";
import {
  ApiResponse,
  ErrorResponse,
  Status,
  StudentData,
  SuccessResponse,
} from "../../types";
import { ExternalData } from "../../types/external";

const mock = new MockAdapter(axios);

const studentFirstName = faker.person.firstName();
const studentLastName = faker.person.lastName();
const emailStudent = faker.internet.email({
  firstName: studentFirstName,
  provider: "edusign.fr",
});
const emailsExternals = [faker.internet.email()];
const studentId = faker.string.sample(16);
const externalId = faker.string.sample(16);

describe("app test", () => {
  afterEach(() => {
    mock.reset();
    server.close();
  });

  test("home route", async () => {
    const res = await request(server).get("/");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("homeText");
    expect(res.body.homeText).toBe("My super home text");
  });

  test("get student email", async () => {
    const dataResponse: ApiResponse<StudentData> = {
      status: Status.Success,
      result: {
        ID: studentId,
        id: studentId,
        EMAIL: emailStudent,
        FIRSTNAME: studentFirstName,
        LASTNAME: studentLastName,
        USERNAME: faker.internet.userName({
          firstName: studentFirstName,
          lastName: studentLastName,
        }),
        PHOTO: null,
        PHONE: "",
        TRAINING_NAME: "",
        FILE_NUMBER: null,
        COMPANY: "",
        TAGS: [],
        SIGNATURE_ID: "",
        HIDDEN: 0,
        DATE_CREATED: faker.date.recent().toISOString(),
        DATE_UPDATED: null,
        MULTI_ACCOUNT_LOGIN_CODE: 0,
        SCHOOL_ID: faker.string.sample(16),
        BADGE_ID: "",
        API_ID: "",
        API_TYPE: "",
        LANGUAGE: "fr",
        NEW_PASSWORD_NEEDED: 1,
        STUDENT_FOLLOWER_ID: [],
        GROUPS: [],
        VARIABLES: [],
      },
    };

    mock
      .onGet("https://ext.edusign.fr/v1/student/by-email", {
        params: {
          email: emailStudent,
        },
      })
      .reply(200, dataResponse);

    const student = await getStudent(emailStudent);

    expect(student.id).toBe(dataResponse.result.id);
    expect(student.email).toBe(emailStudent);
  });

  test("get error if student doesn't exist", async () => {
    const errorResponse: ApiResponse<ErrorResponse> = {
      status: Status.Error,
      message: "An error occured",
      errorCode: "ERROR",
    };

    const emailStudentDoesNotExist = faker.internet.email();
    mock
      .onGet("https://ext.edusign.fr/v1/student/by-email", {
        params: {
          email: emailStudentDoesNotExist,
        },
      })
      .reply(200, errorResponse);

    await expect(
      getStudent(emailStudentDoesNotExist),
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  test("get intervenants emails", async () => {
    const emailIntervenant = emailsExternals[0];

    const dataResponse: ApiResponse<ExternalData> = {
      status: Status.Success,
      result: {
        ID: externalId,
        SCHOOL_ID: faker.string.sample(16),
        FIRSTNAME: faker.person.firstName(),
        LASTNAME: faker.person.lastName(),
        EMAIL: emailIntervenant,
        COMPANY: "",
        PHONE: "",
        DATE_CREATED: faker.date.recent().toISOString(),
        DATE_UPDATED: null,
        TYPE: 0,
        API_ID: "",
        API_TYPE: "",
        HIDDEN: 0,
      },
    };

    mock
      .onGet("https://ext.edusign.fr/v1/externals/by-email", {
        params: {
          email: emailIntervenant,
        },
      })
      .reply(200, dataResponse);

    const intervenants = await getIntervenants(emailsExternals);

    expect(intervenants[0].id).toBe(dataResponse.result.ID);
    expect(intervenants[0].email).toBe(emailIntervenant);
  });

  test("get error if one intervenant email is wrong", async () => {
    const errorResponse: ApiResponse<ErrorResponse> = {
      status: Status.Error,
      message: "ERR_UNKNOWN_EXTERNAL_BY_EMAIL",
      errorCode: "ERROR",
    };
    const emailExternalDoesNotExist = faker.internet.email();

    mock
      .onGet("https://ext.edusign.fr/v1/externals/by-email", {
        params: {
          email: emailExternalDoesNotExist,
        },
      })
      .reply(200, errorResponse);

    await expect(
      getIntervenants([emailExternalDoesNotExist]),
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  test("generate signatories", () => {
    const signatories = generateSignatories(studentId, [externalId]);

    expect(signatories).toStrictEqual([
      {
        type: "student",
        id: studentId,
        elements: [
          {
            type: "",
            position: {
              page: 1,
              x: 100,
              y: 200,
            },
          },
        ],
      },
      {
        type: "external",
        id: externalId,
        elements: [
          {
            type: "",
            position: {
              page: 2,
              x: 10,
              y: 10,
            },
          },
        ],
      },
    ]);
  });

  test.only("send documents to recipients", async () => {
    const base64 = "aGVsbG8gd29ybGQ=";
    const dataResponse: SuccessResponse<{
      documentsSuccess: number;
      documents: string[];
    }> = {
      status: Status.Success,
      result: {
        documentsSuccess: 1,
        documents: [base64],
      },
    };

    mock
      .onPost("https://ext.edusign.fr/v1/document/v2/send-base64", {
        user_id: "***REMOVED***",
        document: {
          name: "consigne",
          base64,
        },
        signatories: [
          {
            type: "student",
            id: studentId,
            elements: [
              {
                type: "",
                position: {
                  page: 1,
                  x: 100,
                  y: 200,
                },
              },
            ],
          },
          {
            type: "external",
            id: externalId,
            elements: [
              {
                type: "",
                position: {
                  page: 2,
                  x: 10,
                  y: 10,
                },
              },
            ],
          },
        ],
        sendDocumentToRecipients: true,
        emailReminder: {
          subject: "",
          message: "",
          amount: 0,
          interval: 0,
        },
        directoryId: "",
      })
      .reply(200, dataResponse);

    const response = await sendDocuments(studentId, [externalId], base64);

    expect(response.status).toBe(Status.Success);
    expect(response).toStrictEqual(dataResponse);
  });
});
