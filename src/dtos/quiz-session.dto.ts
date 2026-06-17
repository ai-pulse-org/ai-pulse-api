import { z } from 'zod';

/**
 * -----------------------------
 * Create request payload. - Fields that are required to create a record
 * -----------------------------
 */
export const CreateQuizSessionRequestSchema = z.object({
  difficulty_level_id: z.number().int().positive(),
  total_questions: z.number().int().min(1),
  quiz_status_id: z.number().int().positive(),
});

export type CreateQuizSessionRequest = z.infer<
  typeof CreateQuizSessionRequestSchema
>;

/**
 * -----------------------------
 * Update request payload. - Fields that can be updated.
 * -----------------------------
 */
export const UpdateQuizSessionRequestSchema = z.object({
  current_question_index: z.number().int().min(0).optional(),
  quiz_status_id: z.number().int().positive().optional(),
  score_total: z.number().min(0).optional(),
});

export type UpdateQuizSessionRequest = z.infer<
  typeof UpdateQuizSessionRequestSchema
>;

/**
 * -----------------------------
 * API response for data - To pass around the application and to send to the client.
 * -----------------------------
 */
export interface QuizSessionResponse {
  id: number;
  difficulty_level_id: number;
  difficulty_level: string;
  total_questions: number;
  current_question_index: number;
  quiz_status_id: number;
  quiz_status: string;
  score_total: number;
}

/**
 * -----------------------------
 * Represents database record - To map the database record to the API response.
 * -----------------------------
 */
export interface QuizSessionRecord {
  id: number;
  difficulty_level_id: number;
  difficulty_level: string;
  total_questions: number;
  current_question_index: number;
  quiz_status_id: number;
  quiz_status: string;
  score_total: number;
  created_at: Date;
  completed_at?: Date | null;
}
