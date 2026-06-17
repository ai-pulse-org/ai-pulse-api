import { z } from 'zod';

/**
 * -----------------------------
 * Test - Just placeholder
 * -----------------------------
 */
export const CreateTestRequestSchema = z.object({
  id: z.number().int().positive(),
});

export type CreateTestRequest = z.infer<typeof CreateTestRequestSchema>;

export interface TestResponse {
  id: number;
}

// ###################################

/**
 * -----------------------------
 * Create request payload. - Fields that are required to create a record
 * -----------------------------
 */

// *** NOTE: Rename this to StartQuizSchema ***
export const CreateQuizSessionRequestSchema = z.object({
  difficulty_level_id: z.number().int().positive(),
  total_questions: z.number().int().min(1),
  quiz_status_id: z.number().int().positive(),
});

export type CreateQuizSessionRequest = z.infer<
  typeof CreateQuizSessionRequestSchema
>;
