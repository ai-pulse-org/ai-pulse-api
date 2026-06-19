import { db } from '../config/knex';
import {
  CreateQuizReportRequest,
  QuizReportRecord,
  QuizReportResponse,
} from '../dtos/quiz-report.dto';

export class QuizReportRepository {
  private TABLE = 'quiz_reports';

  private mapToResponse(row: QuizReportRecord): QuizReportResponse {
    return {
      id: row.id,
      session_id: row.session_id,
      total_score: row.total_score,
      percentage_score: row.percentage_score,
      summary_feedback: row.summary_feedback,
      created_at: row.created_at,
    };
  }

  async getByID(
    id: number,
    trx?: any,
  ): Promise<QuizReportResponse | undefined> {
    const query = trx ?? db;
    const row: QuizReportRecord = await query(this.TABLE)
      .select('*')
      .where('id', id)
      .first();
    if (!row) return undefined;
    return this.mapToResponse(row);
  }

  async getBySessionId(
    session_id: number,
    trx?: any,
  ): Promise<QuizReportResponse | undefined> {
    const query = trx ?? db;
    const row: QuizReportRecord = await query(this.TABLE)
      .select('*')
      .where('session_id', session_id)
      .first();
    if (!row) return undefined;
    return this.mapToResponse(row);
  }

  async create(dto: CreateQuizReportRequest, trx?: any): Promise<number> {
    const query = trx ?? db;
    const [id] = await query(this.TABLE)
      .insert({
        session_id: dto.session_id,
        total_score: dto.total_score,
        percentage_score: dto.percentage_score,
        summary_feedback: dto.summary_feedback,
      })
      .onConflict('session_id')
      .ignore();
    return id;
  }
}
