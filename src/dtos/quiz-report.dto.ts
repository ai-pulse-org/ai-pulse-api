import { z } from 'zod';

// Represents database record - To map the database record to the API response.
export type QuizReportRecord = {
  id: number;
  session_id: number;
  total_score: number;
  percentage_score: number;
  summary_feedback: string | null;
  created_at: Date;
};

// API response for data - To pass around the application and to send to the client.
export type QuizReportResponse = Pick<
  QuizReportRecord,
  | 'id'
  | 'session_id'
  | 'total_score'
  | 'percentage_score'
  | 'summary_feedback'
  | 'created_at'
>;

// Create request payload - Fields required to create a record
export const CreateQuizReportRequestSchema = z.object({
  session_id: z.number().int().nonnegative(),
  total_score: z.number().int().nonnegative(),
  percentage_score: z.number().min(0).max(100),
  summary_feedback: z.string().nullable().optional(),
});

export type CreateQuizReportRequest = z.infer<
  typeof CreateQuizReportRequestSchema
>;
