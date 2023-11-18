import express from "express";
import type { Application, Request, Response } from "express";
import cors, { type CorsOptions } from "cors";
import axios from "axios";
import type { ApiResponse, Person, StudentData, ErrorResponse } from "../types";
import { Status } from "../types";
import { ExternalData } from "../types/external";

const app: Application = express();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

const corsOptions: CorsOptions = {};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Get student id
 *
 * @param {string} email
 * @return {Person}
 * @throws Error
 */
async function getStudent(email: string): Promise<Person> {
  const response = await axios.get<ApiResponse<StudentData>>(
    "https://ext.edusign.fr/v1/student/by-email",
    {
      params: { email },
    },
  );

  if (response.data.status === Status.Error) {
    throw new Error((response.data as ErrorResponse).message);
  }

  return { id: response.data.result.id, email };
}

async function getIntervenants(emails: string[]): Promise<Person[]> {
  const intervenantsPromises = emails.map(async (email) => {
    const response = await axios.get<ApiResponse<ExternalData>>(
      "https://ext.edusign.fr/v1/externals/by-email",
      {
        params: { email },
      },
    );

    if (response.data.status === Status.Error) {
      throw new Error((response.data as ErrorResponse).message);
    }
    return { id: response.data.result.ID, email };
  });

  return Promise.all(intervenantsPromises);
}

async function sendDocuments(): Promise<{ status: number; message: string }> {
  // emails: string[],
  return {
    status: 200,
    message: "ok",
  };
}

const server = app
  .listen(PORT, "localhost", function () {
    console.log(`Server is running on port ${PORT}.`);

    app.route("/").get((req: Request, res: Response) => {
      res.json({ homeText: "My super home text" });
    });
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });

export { server, getStudent, getIntervenants, sendDocuments };
