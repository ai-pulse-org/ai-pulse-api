import { db } from '../config/knex';
import { sanitizeUpdate } from '../utils/sanitize-update.util';
import {
  CreateQuizSessionRequest,
  QuizSessionRecord,
  QuizSessionResponse,
  UpdateQuizSessionRequest,
} from '../dtos/quiz-session.dto';
import { ValidationError } from '../errors/ValidationError';
import { QuizStatus } from '../constants/quiz-status.constants';

export class QuizSessionRepository {
  // Private members
  private TABLE = 'quiz_sessions';

  private ALLOWED_UPDATE_FIELDS: (keyof UpdateQuizSessionRequest)[] = [
    'current_question_index',
    'quiz_status_id',
    'score_total',
    'completed_at',
  ];

  private mapToResponse(row: QuizSessionRecord): QuizSessionResponse {
    return {
      id: row.id,
      difficulty_level_id: row.difficulty_level_id,
      difficulty_level: row.difficulty_level,
      total_questions: row.total_questions,
      current_question_index: row.current_question_index,
      quiz_status_id: row.quiz_status_id,
      quiz_status: row.quiz_status,
      score_total: row.score_total,
      completed_at: row.completed_at,
    };
  }

  // Public members
  async getAll(): Promise<QuizSessionResponse[]> {
    const rows: QuizSessionRecord[] = await db('vw_quiz_sessions')
      .select('*')
      .orderBy('id', 'desc');
    const responses = rows.map((row) => this.mapToResponse(row));
    return responses;
  }

  async getByID(
    id: number,
    trx?: any,
  ): Promise<QuizSessionResponse | undefined> {
    const query = trx ?? db;

    const row: QuizSessionRecord = await query('vw_quiz_sessions')
      .select('*')
      .where('id', id)
      .first();
    if (!row) return undefined;
    return this.mapToResponse(row);
  }

  async create(dto: CreateQuizSessionRequest, trx?: any): Promise<number> {
    const query = trx ?? db;

    const [id] = await query(this.TABLE).insert({
      difficulty_level_id: dto.difficulty_level_id,
      total_questions: dto.total_questions,
      quiz_status_id: QuizStatus.NEW,
    });

    return id;
  }

  async update(
    id: number,
    dto: UpdateQuizSessionRequest,
  ): Promise<QuizSessionResponse | undefined> {
    const clean = sanitizeUpdate(dto, this.ALLOWED_UPDATE_FIELDS);

    if (Object.keys(clean).length === 0) {
      throw new ValidationError('No valid fields to update');
    }

    const affected = await db(this.TABLE)
      .where({ id })
      .whereNull('completed_at')
      .update(clean);

    if (!affected) return undefined;
    return this.getByID(id);
  }

  // Update (quiz_statud_id=IN_PROGRESS, current_question_index, score_total)
  async markAsInProgres(
    id: number,
    current_question_index: number,
    score_total: number,
  ): Promise<QuizSessionResponse | undefined> {
    const qsDto: UpdateQuizSessionRequest = {
      quiz_status_id: QuizStatus.IN_PROGRESS,
      current_question_index: current_question_index,
      score_total: score_total,
    };
    return await this.update(id, qsDto);
  }

  async markAsCompleted(id: number): Promise<QuizSessionResponse | undefined> {
    const qsDto: UpdateQuizSessionRequest = {
      quiz_status_id: QuizStatus.COMPLETED,
      completed_at: new Date(),
    };
    return await this.update(id, qsDto);
  }
}
