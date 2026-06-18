import { z } from 'zod';

// Represents database record - To map the database record to the API response.
export type QuizAnswerRecord = {
  id: number;
  quiz_question_id: number;
  user_answer: string;
  completed_at?: Date | null;
};

// API response for data - To pass around the application and to send to the client.
export type QuizAnswerResponse = Pick<
  QuizAnswerRecord,
  'id' | 'quiz_question_id' | 'user_answer' | 'completed_at'
>;

// Create request payload - Fields required to create a record
export const CreateQuizAnswerRequestSchema = z.object({
  quiz_question_id: z.number().int().positive(),
  user_answer: z.string().trim().min(1).max(1000),
});

export type CreateQuizAnswerRequest = z.infer<
  typeof CreateQuizAnswerRequestSchema
>;
