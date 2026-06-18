import { z } from 'zod';

// Represents database record - To map the database record to the API response.
export type QuizScoreRecord = {
  id: number;
  answer_id: number;
  score: number;
  feedback?: string | null;
  rubric_version?: string | null;
  model_used?: string | null;
  latency_ms?: number | null;
  tokens_used?: number | null;
  created_at?: Date | null;
};

// API response for data - To pass around the application and to send to the client.
export type QuizScoreResponse = Pick<
  QuizScoreRecord,
  | 'id'
  | 'answer_id'
  | 'score'
  | 'feedback'
  | 'rubric_version'
  | 'model_used'
  | 'latency_ms'
  | 'tokens_used'
  | 'created_at'
>;

// Create request payload - Fields required to create a record
export const CreateQuizScoreRequestSchema = z.object({
  answer_id: z.number().int().nonnegative(),
  score: z.number().int().min(0).max(10),
  feedback: z.string().nullable().optional(),
  rubric_version: z.string().max(100).nullable().optional(),
  model_used: z.string().max(100).nullable().optional(),
  latency_ms: z.number().int().nonnegative().nullable().optional(),
  tokens_used: z.number().int().nonnegative().nullable().optional(),
});

export type CreateQuizScoreRequest = z.infer<
  typeof CreateQuizScoreRequestSchema
>;
