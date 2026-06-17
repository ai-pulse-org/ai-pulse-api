import { TestResponse, CreateQuizSessionRequest } from '../dtos/quiz.dto';
import { QuizRepository } from '../repositories/quiz.repository';
import { db as knex } from '../config/knex';
import { QuestionService } from '../services/question.service';
import { CreateQuizQuestionRequest } from '../dtos/quiz-question.dto';
import { QuizQuestionRepository } from '../repositories/quiz-question.repository';
import { QuizSessionRepository } from '../repositories/quiz-session.repository';

export class QuizService {
  private repository = new QuizRepository();

  private questionService = new QuestionService();
  private quizQuestionRepository = new QuizQuestionRepository(); // ToDo : Access repository via service
  private quizSessionRepository = new QuizSessionRepository(); // ToDo : Access repository via service

  async test(): Promise<TestResponse> {
    return this.repository.test();
  }

  async startQuiz(dto: CreateQuizSessionRequest) {
    const questionIds = await this.questionService.getRandomQuestions(10);

    return knex.transaction(async (trx) => {
      const sessionId = await this.quizSessionRepository.create(dto, trx);
      // Build rows with safe ordering
      const rows: CreateQuizQuestionRequest[] = questionIds.map(
        (questionId, index) => ({
          session_id: sessionId,
          question_id: questionId,
          question_order: index + 1,
        }),
      );
      // Bulk insert
      await this.quizQuestionRepository.bulkInsertIgnore(rows, trx);

      return {
        sessionId,
        questionsInserted: rows.length,
      };
    });
  }
}
