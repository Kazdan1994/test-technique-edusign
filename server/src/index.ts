import type { Application, Request, Response } from "express";
import express from "express";
import cors, { type CorsOptions } from "cors";
import axios from "axios";
import "dotenv/config";
import type {
  ApiResponse,
  DocumentData,
  ErrorResponse,
  Person,
  StudentData,
} from "../types";
import { Status } from "../types";
import { ExternalData } from "../types/external";
import { RequestDocument } from "../types/api";

const app: Application = express();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

const corsOptions: CorsOptions = {};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

***REMOVED*** `Bearer ${process.env.TOKEN}`;

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
      user_id: "***REMOVED***",
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

const server = app
  .listen(PORT, "localhost", function () {
    console.log(`Server is running on port ${PORT}.`);

    app.get("/", (req: Request, res: Response) => {
      res.json({ homeText: "My super home text" });
    });

    app.post("/sendDocument", async (req: Request, res: Response) => {
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
    });
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });

export {
  server,
  getStudent,
  getIntervenants,
  sendDocuments,
  generateSignatories,
};
