import { z } from 'zod';

// Represents database record - To map the database record to the API response.
export type QuizQuestionRecord = {
  id: number;
  session_id: number;
  question_id: number;
  question_order: number;
};

// API response for data - To pass around the application and to send to the client.
export type QuizQuestionResponse = Pick<
  QuizQuestionRecord,
  'id' | 'session_id' | 'question_id' | 'question_order'
>;

// Create request payload - Fields required to create a record
export const CreateQuizQuestionRequestSchema = z.object({
  session_id: z.number().int().positive(),
  question_id: z.number().int().positive(),
  question_order: z.number().int().min(1),
});

export type CreateQuizQuestionRequest = z.infer<
  typeof CreateQuizQuestionRequestSchema
>;
