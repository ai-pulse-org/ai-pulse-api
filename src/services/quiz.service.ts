import { NotFoundError } from '../errors/NotFoundError';
import { ValidationError } from '../errors/ValidationError';
import { StartQuizRequest, SubmitAnswerRequest } from '../dtos/quiz.dto';
import { QuizRepository } from '../repositories/quiz.repository';
import { db as knex } from '../config/knex';
import { QuestionService } from '../services/question.service';
import { CreateQuizQuestionRequest } from '../dtos/quiz-question.dto';
import { QuizSessionRepository } from '../repositories/quiz-session.repository';
import { QuizQuestionRepository } from '../repositories/quiz-question.repository';
import { QuizAnswerRepository } from '../repositories/quiz-answer.repository';
import { CreateQuizAnswerRequest } from '../dtos/quiz-answer.dto';

export class QuizService {
  private repository = new QuizRepository();

  private questionService = new QuestionService();
  private quizSessionRepository = new QuizSessionRepository();
  private quizQuestionRepository = new QuizQuestionRepository();
  private quizAnswerRepository = new QuizAnswerRepository();

  async startQuiz(dto: StartQuizRequest) {
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

      // Get session and first question
      const session = await this.quizSessionRepository.getByID(sessionId, trx);
      const questionToAnswer = await this.repository.getNextQuestion(
        sessionId,
        trx,
      );

      return {
        session,
        questionToAnswer,
      };
    });
  }

  async submitAnswer(dto: SubmitAnswerRequest) {
    return knex.transaction(async (trx) => {
      // Get session and validate
      const session = await this.quizSessionRepository.getByID(
        dto.session_id,
        trx,
      );

      if (!session) {
        throw new NotFoundError('Quiz session not found');
      }

      if (session.completed_at != null) {
        throw new ValidationError('Quiz session already completed');
      }

      // Get quiz question and validate
      const quizQuestion = await this.quizQuestionRepository.getByID(
        dto.quiz_question_id,
        trx,
      );

      if (!quizQuestion) {
        throw new NotFoundError('Quiz question not found');
      }

      if (quizQuestion.session_id != dto.session_id) {
        throw new ValidationError('Invalid session');
      }

      if (quizQuestion.question_id != dto.question_id) {
        throw new ValidationError('Invalid question');
      }

      // Check if quiz answer already submitted - Handling duplicate submissions
      const quizAnswer = await this.quizAnswerRepository.getByQuizQuestionId(
        dto.quiz_question_id,
        trx,
      );

      // Save quiz answer only if it's not already saved - Handling duplicate submissions
      if (!quizAnswer) {
        // Save the submitted answer
        const qaDto: CreateQuizAnswerRequest = {
          quiz_question_id: dto.quiz_question_id,
          user_answer: dto.user_answer,
        };
        const quizAnswerId = await this.quizAnswerRepository.create(qaDto, trx);

        // ToDo: Send a request to score the submitted answer and save the score to quiz_scores table
      }

      // Get next question
      const questionToAnswer = await this.repository.getNextQuestion(
        dto.session_id,
        trx,
      );

      if (!questionToAnswer) {
        // ToDo:
        //      No more questionToAnswer meaning all questions are submittted
        //      Send request to update quiz_sessions table (completed_at, quiz_status_id, current_question_index, etc.)
        //      Send request to add quiz report to quiz_reports table
      }

      return {
        session,
        questionToAnswer: questionToAnswer || undefined,
        complete: !questionToAnswer,
      };
    });
  }
}
