import request from "supertest";
import { faker } from "@faker-js/faker";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getIntervenants, getStudent, sendDocuments, server } from "..";
import { ApiResponse, ErrorResponse, Status, StudentData } from "../../types";
import { ExternalData } from "../../types/external";

const mock = new MockAdapter(axios);

const studentFirstName = faker.person.firstName();
const studentLastName = faker.person.lastName();
const emailStudent = faker.internet.email({
  firstName: studentFirstName,
  provider: "edusign.fr",
});
const emailsIntervenants = [faker.internet.email()];

describe("app test", () => {
  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    mock.reset();
  });

  test("home route", async () => {
    const res = await request(server).get("/");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("homeText");
    expect(res.body.homeText).toBe("My super home text");
  });

  test("get student email", async () => {
    const id = faker.string.sample(16);
    const dataResponse: ApiResponse<StudentData> = {
      status: Status.Success,
      result: {
        ID: id,
        id,
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
    const emailIntervenant = emailsIntervenants[0];

    const dataResponse: ApiResponse<ExternalData> = {
      status: Status.Success,
      result: {
        ID: faker.string.sample(16),
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

    const intervenants = await getIntervenants(emailsIntervenants);

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

  test("send documents to recipients", async () => {
    // const emailsIntervenants = ["sebastien+391948@edusign.fr"];
    const response =
      await sendDocuments(/*[emailStudent, ...emailsIntervenants]*/);

    expect(response.status).toBe(200);
    expect(response).toHaveProperty("message");
    expect(response.message).toBe("ok");
  });
});
