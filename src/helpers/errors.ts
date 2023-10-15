export type ErrorType = {
  code: string;
  message: string;
};

export const isErrorType = (error: unknown): error is ErrorType => {
  return (
    !!error &&
    typeof error === 'object' &&
    'code' in error &&
    'message' in error
  );
};
