import { CreateQuizScoreRequest } from '../dtos/quiz-score.dto';
import { QuizScoreRepository } from '../repositories/quiz-score.repository';

export class QuizScoreService {
  private repository = new QuizScoreRepository();

  async addQuizScore(dto: CreateQuizScoreRequest): Promise<number> {
    return this.repository.create(dto);
  }
}
