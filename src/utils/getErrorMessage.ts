import { env } from './env.utils';

export const getErrorMessage = (error: unknown): string => {
  console.error(error);
  if (env.isDev && error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong.';
};
