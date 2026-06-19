export const QuizStatus = {
  NEW: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3,
} as const;

export type QuizStatusId = (typeof QuizStatus)[keyof typeof QuizStatus];
