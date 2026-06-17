import { NotFoundError } from '../errors/NotFoundError';
import {
  CreateQuizSessionRequest,
  QuizSessionResponse,
  UpdateQuizSessionRequest,
} from '../dtos/quiz-session.dto';
import { QuizSessionRepository } from '../repositories/quiz-session.repository';

export class QuizSessionService {
  private repository = new QuizSessionRepository();

  async getAllQuizSessions(): Promise<QuizSessionResponse[]> {
    return this.repository.getAll();
  }

  async getQuizSessionsByID(id: number): Promise<QuizSessionResponse> {
    const session = await this.repository.getByID(id);

    if (!session) {
      throw new NotFoundError('Quiz session not found');
    }
    return session;
  }

  async addQuizSession(dto: CreateQuizSessionRequest): Promise<number> {
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
