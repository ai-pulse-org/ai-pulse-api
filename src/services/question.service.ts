import { QuestionRepository } from '../repositories/question.repository';

export class QuestionService {
  private repository = new QuestionRepository();

  async getRandomQuestions(n: number): Promise<number[]> {
    return this.repository.getRandomQuestions(n);
  }
}
