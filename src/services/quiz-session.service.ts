import { NotFoundError } from '../errors/NotFoundError';
import {
  CreateQuizSessionRequest,
  QuizSessionResponse,
  UpdateQuizSessionRequest,
} from '../dtos/quiz-session.dto';
import { QuizSessionRepository } from '../repositories/quiz-session.repository';

export class QuizSessionService {
  private repository = new QuizSessionRepository();

  async getQuizSessions(): Promise<QuizSessionResponse[]> {
    return this.repository.getAll();
  }

  async getQuizSessionsByID(
    id: number,
  ): Promise<QuizSessionResponse | undefined> {
    const session = await this.repository.getByID(id);

    if (!session) {
      throw new NotFoundError('Quiz session not found');
    }
    return session;
  }

  async addQuizSession(dto: CreateQuizSessionRequest): Promise<number> {
    if (!dto.difficulty_level_id) {
      throw new Error('Difficulty level is required');
    }

    if (!dto.total_questions || dto.total_questions <= 0) {
      throw new Error('Total questions must be greater than zero');
    }

    if (!dto.quiz_status_id) {
      throw new Error('Quiz status is required');
    }

    return this.repository.create(dto);
  }

  async updateQuizSession(
    id: number,
    dto: UpdateQuizSessionRequest,
  ): Promise<QuizSessionResponse> {
    const session = await this.repository.update(id, dto);

    if (!session) {
      throw new NotFoundError('Quiz session not found');
    }
    return session;
  }
}
