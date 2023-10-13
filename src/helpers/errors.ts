import { ErrorType } from '@/constants/errors';

export const isErrorType = (error: unknown): error is ErrorType => {
  return (
    !!error &&
    typeof error === 'object' &&
    'code' in error &&
    'message' in error
  );
};
