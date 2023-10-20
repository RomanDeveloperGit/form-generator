import { ExpectedError, isExpectedError } from '@/helpers/errors';

import {
  CLIENT_ERROR_CODE,
  UNEXPECTED_ERROR_MESSAGE,
} from '@/constants/errors';

export const createExpectedError = (message: string): ExpectedError => ({
  code: CLIENT_ERROR_CODE,
  message,
});

export const getErrorMessage = (error: unknown): string => {
  return isExpectedError(error) ? error.message : UNEXPECTED_ERROR_MESSAGE;
};
