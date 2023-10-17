import { ErrorType, isErrorType } from '@/helpers/errors';

import {
  CLIENT_ERROR_CODE,
  UNEXPECTED_ERROR_MESSAGE,
} from '@/constants/errors';

type GenerateClientErrorFunction = (message: string) => ErrorType;
type GetErrorMessageFunction = (error: unknown) => string;

export const createClientErrorObject: GenerateClientErrorFunction = (
  message,
) => ({
  code: CLIENT_ERROR_CODE,
  message,
});

export const getErrorMessage: GetErrorMessageFunction = (error) => {
  return isErrorType(error) ? error.message : UNEXPECTED_ERROR_MESSAGE;
};
