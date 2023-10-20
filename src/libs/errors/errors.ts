export const CLIENT_ERROR_CODE = 'CLIENT_ERROR_CODE';
export const UNEXPECTED_ERROR_MESSAGE = 'Непредвиденная ошибка.';

export type ExpectedError = {
  code: string;
  message: string;
};

export const isExpectedError = (error: unknown): error is ExpectedError => {
  return (
    !!error &&
    typeof error === 'object' &&
    'code' in error &&
    'message' in error
  );
};

export const createExpectedError = (message: string): ExpectedError => ({
  code: CLIENT_ERROR_CODE,
  message,
});

export const getErrorMessage = (error: unknown): string => {
  return isExpectedError(error) ? error.message : UNEXPECTED_ERROR_MESSAGE;
};
