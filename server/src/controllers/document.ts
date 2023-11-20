"use strict";

import { Response, Request } from "express";
import axios from "axios";
import type {
  ApiResponse,
  DocumentData,
  ErrorResponse,
  Person,
  StudentData,
  ExternalData,
  RequestDocument,
} from "../../types";
import { Status } from "../../types";

axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.TOKEN}`;

/**
 * Get student id
 *
 * @param {string} email
 * @return {Person}
 * @throws Error
 */
async function getStudent(email: string): Promise<Person> {
  const response = await axios.get<ApiResponse<StudentData>>(
    `https://ext.edusign.fr/v1/student/by-email/${email}`,
  );

  if (response.data.status === Status.Error) {
    throw new Error((response.data as ErrorResponse).message);
  }

  return { id: response.data.result.id, email };
}

async function getIntervenants(emails: string[]): Promise<Person[]> {
  const intervenantsPromises = emails.map(async (email) => {
    const response = await axios.get<ApiResponse<ExternalData>>(
      `https://ext.edusign.fr/v1/externals/by-email/${email}`,
    );

    if (response.data.status === Status.Error) {
      throw new Error((response.data as ErrorResponse).message);
    }
    return { id: response.data.result.ID, email };
  });

  return Promise.all(intervenantsPromises);
}

function generateSignatories(student: string, externals: string[]) {
  const signatories = [
    {
      type: "student",
      id: student,
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
  ];

  return signatories.concat(
    externals.map((external, i) => ({
      type: "external",
      id: external,
      elements: [
        {
          type: "",
          position: {
            page: 2 + i,
            x: 10 * (i + 1),
            y: 10 * (i + 1),
          },
        },
      ],
    })),
  );
}

async function sendDocuments(
  student: string,
  externals: string[],
  base64: string,
): Promise<ApiResponse<DocumentData>> {
  const signatories = generateSignatories(student, externals);

  const response = await axios.post<ApiResponse<StudentData>>(
    "https://ext.edusign.fr/v1/document/v2/send-base64",
    {
      user_id: process.env.USER_ID,
      document: {
        name: "consigne",
        base64: base64,
      },
      signatories,
      sendDocumentToRecipients: true,
      emailReminder: {
        subject: "",
        message: "",
        amount: 0,
        interval: 0,
      },
      directoryId: "",
    },
  );

  if (response.data.status === Status.Error) {
    throw new Error((response.data as ErrorResponse).message);
  }

  return {
    status: Status.Success,
    result: {
      documentsSuccess: 1,
      documents: [base64],
    },
  };
}

async function send(req: Request, res: Response) {
  try {
    const { file, student, external } = req.body as RequestDocument;

    const studentId = (await getStudent(student)).id;
    const externalIds = (await getIntervenants(external)).map((p) => p.id);

    await sendDocuments(studentId, externalIds, file);

    res.json({ message: "Document sent successfully" });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: (error as Error).message,
      errorCode: "INTERNAL_ERROR",
    });
  }
}

export {
  getStudent,
  getIntervenants,
  generateSignatories,
  sendDocuments,
  send,
};
