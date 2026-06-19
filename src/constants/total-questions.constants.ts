import { z } from 'zod';

export const TotalQuestions = {
  TEN: 10,
  FIFTEEN: 15,
  TWENTY: 20,
} as const;

export const TotalQuestionsSchema = z.union([
  z.literal(TotalQuestions.TEN),
  z.literal(TotalQuestions.FIFTEEN),
  z.literal(TotalQuestions.TWENTY),
]);
