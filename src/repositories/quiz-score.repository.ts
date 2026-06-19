import { db } from '../config/knex';
import {
  CreateQuizScoreRequest,
  QuizScoreRecord,
  QuizScoreResponse,
} from '../dtos/quiz-score.dto';

export class QuizScoreRepository {
  private TABLE = 'quiz_scores';
  private mapToResponse(row: QuizScoreRecord): QuizScoreResponse {
    return {
      id: row.id,
      answer_id: row.answer_id,
      score: row.score,
      feedback: row.feedback,
      rubric_version: row.rubric_version,
      model_used: row.model_used,
      latency_ms: row.latency_ms,
      tokens_used: row.tokens_used,
      created_at: row.created_at,
    };
  }

  async getByID(id: number, trx?: any): Promise<QuizScoreResponse | undefined> {
    const query = trx ?? db;
    const row: QuizScoreRecord = await query(this.TABLE)
      .select('*')
      .where('id', id)
      .first();
    if (!row) return undefined;
    return this.mapToResponse(row);
  }

  async getByAnswerId(
    answer_id: number,
    trx?: any,
  ): Promise<QuizScoreResponse | undefined> {
    const query = trx ?? db;
    const row: QuizScoreRecord = await query(this.TABLE)
      .select('*')
      .where('answer_id', answer_id)
      .first();
    if (!row) return undefined;
    return this.mapToResponse(row);
  }

  async create(dto: CreateQuizScoreRequest, trx?: any): Promise<number> {
    const query = trx ?? db;
    const [id] = await query(this.TABLE)
      .insert({
        answer_id: dto.answer_id,
        score: dto.score,
        feedback: dto.feedback,
        rubric_version: dto.rubric_version,
        model_used: dto.model_used,
        latency_ms: dto.latency_ms,
        tokens_used: dto.tokens_used,
      })
      .onConflict('answer_id')
      .ignore();
    return id;
  }
}
