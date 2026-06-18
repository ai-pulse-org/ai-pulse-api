import { z } from 'zod';

/**
 * -----------------------------
 * Create request payload. - Fields that are required to start new quiz
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
 * Represents database record - To map the database record to the API response.
 * -----------------------------
 */
export type QuizQuestionAnswerRecord = {
  // Quiz question
  quiz_question_id: number;
  session_id: number;
  question_id: number;
  question_order: number;

  // Quiz session
  total_questions: number;
  current_question_index: number;
  score_total: number;
  session_created_at: string; // ISO datetime
  completed_at: string | null;

  // Session difficulty
  session_difficulty_level_id: number;
  session_difficulty_level: string;

  // Quiz status
  quiz_status_id: number;
  quiz_status: string;

  // Question details
  question: string;
  reference_answer: string;
  question_is_active: boolean;

  // Question difficulty
  question_difficulty_level_id: number;
  question_difficulty_level: string;

  // Category
  category_id: number;
  category: string;

  // User answer
  answer_id: number | null;
  user_answer: string | null;
  answered_at: string | null;

  // Score
  score: number | null;
  feedback: string | null;
  rubric_version: string | null;
  model_used: string | null;
  latency_ms: number | null;
  tokens_used: number | null;
  scored_at: string | null;
};

/**
 * -----------------------------
 * API response for data - To pass around the application and to send to the client.
 * -----------------------------
 */
export type QuizQuestionAnswerResponse = Pick<
  QuizQuestionAnswerRecord,
  | 'quiz_question_id'
  | 'session_id'
  | 'question_id'
  | 'quiz_status_id'
  | 'quiz_status'
  | 'question'
  | 'question_difficulty_level_id'
  | 'question_difficulty_level'
  | 'category_id'
  | 'category'
>;
