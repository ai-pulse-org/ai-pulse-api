import { z } from 'zod';
import {
  DifficultyLevel,
  DifficultyLevelSchema,
} from '../constants/difficulty-level.constants';
import {
  TotalQuestions,
  TotalQuestionsSchema,
} from '../constants/total-questions.constants';

// Represents database record - To map the database record to the API response.
export type QuizSessionRecord = {
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
};

// API response for data - To pass around the application and to send to the client.
export type QuizSessionResponse = Pick<
  QuizSessionRecord,
  | 'id'
  | 'difficulty_level_id'
  | 'difficulty_level'
  | 'total_questions'
  | 'current_question_index'
  | 'quiz_status_id'
  | 'quiz_status'
  | 'score_total'
  | 'completed_at'
>;

// Create request payload - Fields that are required to create a record
export const CreateQuizSessionRequestSchema = z.object({
  difficulty_level_id: DifficultyLevelSchema.default(DifficultyLevel.BEGINNER),
  total_questions: TotalQuestionsSchema.default(TotalQuestions.TEN),
});

export type CreateQuizSessionRequest = z.infer<
  typeof CreateQuizSessionRequestSchema
>;

// Update request payload. - Fields that can be updated.
export const UpdateQuizSessionRequestSchema = z.object({
  current_question_index: z.number().int().min(0).optional(),
  quiz_status_id: z.number().int().positive().optional(),
  score_total: z.number().min(0).optional(),
  completed_at: z.date().nullable().optional(),
});

export type UpdateQuizSessionRequest = z.infer<
  typeof UpdateQuizSessionRequestSchema
>;
