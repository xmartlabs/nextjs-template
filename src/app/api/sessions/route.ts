import { handleError } from '@/helpers/error-handler';
import { ApiError } from '@/networking/api-error';
import { ErrorCode } from '@/types/error-code';
import { CreateSession } from '@/types/session';
import { NextRequest, NextResponse } from "next/server";

// FIXME: remove this once we implement authentication
const mockedCredentials = {
  email: 'user@email.com',
  password: 'password1',
};

export const POST = async (request: NextRequest) => {
  try {
    const jsonRequest = await request.json();
    const params = CreateSession.parse(jsonRequest);

    if (params.email !== mockedCredentials.email || params.password !== mockedCredentials.password) {
      throw new ApiError({
        code: ErrorCode.INVALID_CREDENTIALS,
        message: 'Email and password combination does not exist in the system.'
      })
    }

    return NextResponse.json({})
  } catch (error) {
    return handleError(error);
  }
}
