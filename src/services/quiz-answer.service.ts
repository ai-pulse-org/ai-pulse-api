import { CreateQuizAnswerRequest } from '../dtos/quiz-answer.dto';
import { QuizAnswerRepository } from '../repositories/quiz-answer.repository';

export class QuizAnswerService {
  private repository = new QuizAnswerRepository();

  async addQuizAnswer(dto: CreateQuizAnswerRequest): Promise<number> {
    return this.repository.create(dto);
  }
}
