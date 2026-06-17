// Create request payload. - Fields that are required to create a record
export interface CreateQuizSessionRequest {
  difficulty_level_id: number;
  total_questions: number;
  quiz_status_id: number;
}

// Update request payload. - Fields that can be updated.
export interface UpdateQuizSessionRequest {
  current_question_index?: number;
  quiz_status_id?: number;
  score_total?: number;
}

// API response for data - To pass around the application and to send to the client.
export interface QuizSessionResponse {
  id: number;
  difficulty_level_id: number;
  difficulty_level: string;
  total_questions: number;
  current_question_index?: number;
  quiz_status_id: number;
  quiz_status: string;
  score_total?: number;
}

// Represents database record - To map the database record to the API response.
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
