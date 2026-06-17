import { db } from '../config/knex';
import { TestResponse } from '../dtos/quiz.dto';

export class QuizRepository {
  private TABLE = 'test';

  async test(): Promise<TestResponse> {
    const response: TestResponse = { id: 123 };
    return response;
  }
}
