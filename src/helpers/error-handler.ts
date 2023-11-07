import { ApiError } from "@/networking/api-error";
import { ErrorCode } from "@/types/error-code";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

const formatApiError = (apiError: ApiError) => ({
  ...apiError,
  message: apiError.message,
});

const formatZodError = (error: ZodError) => {
  const errors = error.issues.reduce(
    (acc, issue) => ({ ...acc, [issue.path.join(".")]: issue.message }),
    {},
  );

  return formatApiError(
    new ApiError({
      errors,
      code: ErrorCode.INVALID_SCHEMA,
      message: "Schema validation failed",
    }),
  );
};

// NOTE: this is loosely typed on purpose, so we can catch any kind of
// error here.
export const handleError = (error: any) => {
  if (error instanceof ZodError) {
    return NextResponse.json(formatZodError(error), { status: 400 });
  }
  if (error instanceof ApiError) {
    console.log(error);
    return NextResponse.json(formatApiError(error), { status: 400 });
  }
  // TODO: log this error to an error tracker.
  console.error(error);
  return NextResponse.json(
    formatApiError(
      new ApiError({
        code: ErrorCode.UNEXPECTED_ERROR,
        message: "An unexpected error has occurred",
      }),
    ),
    { status: 500 },
  );
};
