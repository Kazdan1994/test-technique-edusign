import type {
  ApiResponse,
  SuccessResponse,
  ErrorResponse,
  RequestDocument,
} from "./api";
import { Status } from "./api";
import type { StudentData } from "./student";
import type { Person } from "./person";
import type { DocumentData } from "./document";
import type { ExternalData } from "./external";

export type {
  ApiResponse,
  SuccessResponse,
  ErrorResponse,
  StudentData,
  Person,
  DocumentData,
  ExternalData,
  RequestDocument,
};

export { Status };
