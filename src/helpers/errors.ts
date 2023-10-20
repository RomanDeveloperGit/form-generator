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
