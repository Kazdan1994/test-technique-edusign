enum Status {
  Success = "success",
  Error = "error",
}

interface SuccessResponse<T> {
  status: Status.Success;
  result: T;
}

// Define a type for the error response
interface ErrorResponse {
  status: Status.Error;
  message: string;
  errorCode: string;
}

// Define a generic type for either success or error response
type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export type { ApiResponse, SuccessResponse, ErrorResponse };
export { Status };
