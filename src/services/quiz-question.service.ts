import { NotFoundError } from '../errors/NotFoundError';
import { CreateQuizQuestionRequest } from '../dtos/quiz-question.dto';
import { QuizQuestionRepository } from '../repositories/quiz-question.repository';

export class QuizQuestionService {
  private repository = new QuizQuestionRepository();

  async addQuizQuestion(dto: CreateQuizQuestionRequest): Promise<number> {
    return this.repository.create(dto);
  }
}
