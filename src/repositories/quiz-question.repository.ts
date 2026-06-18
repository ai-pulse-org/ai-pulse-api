import { db } from '../config/knex';
import {
  CreateQuizQuestionRequest,
  QuizQuestionResponse,
  QuizQuestionRecord,
} from '../dtos/quiz-question.dto';

export class QuizQuestionRepository {
  private TABLE = 'quiz_questions';

  private mapToResponse(row: QuizQuestionRecord): QuizQuestionResponse {
    return {
      id: row.id,
      session_id: row.session_id,
      question_id: row.question_id,
      question_order: row.question_order,
    };
  }

  async getByID(
    id: number,
    trx?: any,
  ): Promise<QuizQuestionResponse | undefined> {
    const query = trx ?? db;

    const row: QuizQuestionRecord = await query(this.TABLE)
      .select('*')
      .where('id', id)
      .first();
    if (!row) return undefined;
    return this.mapToResponse(row);
  }

  async create(dto: CreateQuizQuestionRequest, trx?: any): Promise<number> {
    const query = trx ?? db;
    const [id] = await query(this.TABLE).insert({
      session_id: dto.session_id,
      question_id: dto.question_id,
      question_order: dto.question_order,
    });

    return id;
  }

  async bulkInsertIgnore(rows: CreateQuizQuestionRequest[], trx: any) {
    return trx(this.TABLE)
      .insert(rows)
      .onConflict(['session_id', 'question_id'])
      .ignore();
  }
}
