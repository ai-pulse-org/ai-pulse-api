import { z } from 'zod';

// +++ /quiz/start +++ //

// Start Quiz Request payload
export const StartQuizRequestSchema = z.object({
  difficulty_level_id: z.number().int().positive(),
  total_questions: z.number().int().min(1),
  quiz_status_id: z.number().int().positive(),
});

export type StartQuizRequest = z.infer<typeof StartQuizRequestSchema>;

// Represents database record - To map the database record to the API response.
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

//  API response for data - To pass around the application and to send to the client.
export type QuizQuestionAnswerResponse = Pick<
  QuizQuestionAnswerRecord,
  | 'quiz_question_id'
  | 'session_id'
  | 'question_id'
  | 'question'
  | 'question_difficulty_level_id'
  | 'question_difficulty_level'
  | 'category_id'
  | 'category'
>;

// Submit Answer Request payload
export const SubmitAnswerRequestSchema = z.object({
  quiz_question_id: z.number().int().positive(),
  session_id: z.number().int().positive(),
  question_id: z.number().int().positive(),
  user_answer: z.string().trim().min(1).max(1000),
});

export type SubmitAnswerRequest = z.infer<typeof SubmitAnswerRequestSchema>;

// +++ /quiz/report/:id +++ //

// For Report - Summary
// Represents database record - To map the database record to the API response.
export type QuizReportSummaryRecord = {
  session_id: number;
  difficulty_level_id: number;
  difficulty_level: string | null;
  total_questions: number;
  current_question_index: number;
  quiz_status_id: number;
  quiz_status: string | null;
  score_total: number;
  session_created_at: string;
  completed_at: string | null;
  report_id: number | null;
  total_score: number | null;
  percentage_score: number | null;
  summary_feedback: string | null;
  report_created_at: string | null;
};

//  API response for data - To pass around the application and to send to the client.
export type QuizReportSummaryResponse = Pick<
  QuizReportSummaryRecord,
  | 'session_id'
  | 'difficulty_level_id'
  | 'difficulty_level'
  | 'total_questions'
  | 'current_question_index'
  | 'quiz_status_id'
  | 'quiz_status'
  | 'score_total'
  | 'session_created_at'
  | 'completed_at'
  | 'report_id'
  | 'total_score'
  | 'percentage_score'
  | 'summary_feedback'
  | 'report_created_at'
>;

// For Report - Questions & Answers
// Represents database record - To map the database record to the API response.
export type QuizReportQuestionsAndAnswersRecord = {
  quiz_question_id: number;
  question_id: number;
  question: string;
  question_order: number;
  category_id: number;
  category: string;
  answer_id: number | null;
  user_answer: string | null;
  answered_at: Date | null;
  score: number;
  feedback: string | null;
};

//  API response for data - To pass around the application and to send to the client.
export type QuizReportQuestionsAndAnswersResponse = Pick<
  QuizReportQuestionsAndAnswersRecord,
  | 'quiz_question_id'
  | 'question_id'
  | 'question'
  | 'question_order'
  | 'category_id'
  | 'category'
  | 'answer_id'
  | 'user_answer'
  | 'answered_at'
  | 'score'
  | 'feedback'
>;
