import { db } from '../config/knex';
import { CreateQuizQuestionRequest } from '../dtos/quiz-question.dto';

export class QuizQuestionRepository {
  private TABLE = 'quiz_questions';

  async create(dto: CreateQuizQuestionRequest): Promise<number> {
    const [id] = await db(this.TABLE).insert({
      session_id: dto.session_id,
      question_id: dto.question_id,
      question_order: dto.question_order,
    });

    return id;
  }

  async bulkInsertIgnore(rows: CreateQuizQuestionRequest[], trx: any) {
    return trx(this.TABLE)
      .insert(rows)
      .onConflict(['session_id', 'question_id'])
      .ignore();
  }
}
