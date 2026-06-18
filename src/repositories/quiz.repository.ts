import { db } from '../config/knex';
import {
  QuizQuestionAnswerRecord,
  QuizQuestionAnswerResponse,
} from '../dtos/quiz.dto';

export class QuizRepository {
  private TABLE = 'vw_quiz_question_answers';

  private mapToResponse(
    row: QuizQuestionAnswerRecord,
  ): QuizQuestionAnswerResponse {
    return {
      quiz_question_id: row.quiz_question_id,
      session_id: row.session_id,
      question_id: row.question_id,
      quiz_status_id: row.quiz_status_id,
      quiz_status: row.quiz_status,
      question: row.question,
      question_difficulty_level_id: row.question_difficulty_level_id,
      question_difficulty_level: row.question_difficulty_level,
      category_id: row.category_id,
      category: row.category,
    };
  }

  async getNextQuestion(
    sessionId: number,
    trx?: any,
  ): Promise<QuizQuestionAnswerResponse | undefined> {
    const query = trx ?? db;

    const row: QuizQuestionAnswerRecord = await query(this.TABLE)
      .where('session_id', sessionId)
      .whereNull('answered_at')
      .orderBy('question_order', 'asc')
      .first();

    if (!row) return undefined;
    return this.mapToResponse(row);
  }
}
