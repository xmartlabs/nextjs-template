import { ErrorCode } from "@/types/error-code";

type ErrorDescriptor = {
  [key: string]: string[] | string;
};

type ConstructorType = {
  message: string;
  code: ErrorCode;
  errors?: ErrorDescriptor;
};

class ApiError extends Error {
  code: ErrorCode;

  errors?: ErrorDescriptor;

  constructor(params: ConstructorType) {
    super(params.message);
    this.code = params.code;
    this.errors = params.errors;
  }
}

export { ApiError };
