import { db } from '../config/knex';

export class QuestionRepository {
  private TABLE = 'questions';

  async getRandomQuestions(n: number): Promise<number[]> {
    const rows = await db(this.TABLE)
      .select('id')
      .orderByRaw('RAND()')
      .limit(n);

    return rows.map((row: { id: number }) => row.id);
  }
}
