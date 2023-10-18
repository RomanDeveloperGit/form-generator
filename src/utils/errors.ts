import { ErrorType, isErrorType } from '@/helpers/errors';

import {
  CLIENT_ERROR_CODE,
  UNEXPECTED_ERROR_MESSAGE,
} from '@/constants/errors';

export const createClientErrorObject = (message: string): ErrorType => ({
  code: CLIENT_ERROR_CODE,
  message,
});

export const getErrorMessage = (error: unknown): string => {
  return isErrorType(error) ? error.message : UNEXPECTED_ERROR_MESSAGE;
};
