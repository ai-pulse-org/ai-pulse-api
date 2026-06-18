import { db } from '../config/knex';
import {
  CreateQuizAnswerRequest,
  QuizAnswerRecord,
  QuizAnswerResponse,
} from '../dtos/quiz-answer.dto';

export class QuizAnswerRepository {
  private TABLE = 'quiz_answers';

  private mapToResponse(row: QuizAnswerRecord): QuizAnswerResponse {
    return {
      id: row.id,
      quiz_question_id: row.quiz_question_id,
      user_answer: row.user_answer,
      completed_at: row.completed_at,
    };
  }

  async getByID(
    id: number,
    trx?: any,
  ): Promise<QuizAnswerResponse | undefined> {
    const query = trx ?? db;

    const row: QuizAnswerRecord = await query(this.TABLE)
      .select('*')
      .where('id', id)
      .first();
    if (!row) return undefined;
    return this.mapToResponse(row);
  }

  async getByQuizQuestionId(
    quiz_question_id: number,
    trx?: any,
  ): Promise<QuizAnswerResponse | undefined> {
    const query = trx ?? db;

    const row: QuizAnswerRecord = await query(this.TABLE)
      .select('*')
      .where('quiz_question_id', quiz_question_id)
      .first();
    if (!row) return undefined;
    return this.mapToResponse(row);
  }

  async create(dto: CreateQuizAnswerRequest, trx?: any): Promise<number> {
    const query = trx ?? db;
    const [id] = await query(this.TABLE)
      .insert({
        quiz_question_id: dto.quiz_question_id,
        user_answer: dto.user_answer,
      })
      .onConflict('quiz_question_id')
      .ignore();

    return id;
  }
}
