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
import { QuizReportRepository } from '../repositories/quiz-report.repository';
import { CreateQuizReportRequest } from '../dtos/quiz-report.dto';
import { QuizScoreRepository } from '../repositories/quiz-score.repository';
import { CreateQuizScoreRequest } from '../dtos/quiz-score.dto';

export class QuizService {
  private repository = new QuizRepository();

  private questionService = new QuestionService();
  private quizSessionRepository = new QuizSessionRepository();
  private quizQuestionRepository = new QuizQuestionRepository();
  private quizAnswerRepository = new QuizAnswerRepository();
  private quizReportRepository = new QuizReportRepository();
  private quizScoreRepository = new QuizScoreRepository();

  async startQuiz(dto: StartQuizRequest) {
    const questionIds = await this.questionService.getRandomQuestions(3); ////

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

        // Checking if quiz answer was saved successfully before saving quiz score.
        if (quizAnswerId) {
          // Save quiz score.
          // ToDo: Score the user answer using LLM-as-Judge and prepare metrics to save
          const qsDto: CreateQuizScoreRequest = {
            answer_id: quizAnswerId,
            score: 7,
            feedback: 'Good response overall, but lacks supporting evidence.',
            rubric_version: 'RubricVersion1.2',
            model_used: 'qwen3:8b',
            latency_ms: 1331,
            tokens_used: 543,
          };
          const quizScoreId = await this.quizScoreRepository.create(qsDto, trx);

          // ToDo: Update quiz_sessions (current_question_index, quiz_statud_id=IN_PROGRESS, score_total)
        }
      }

      // Get next question
      // Note:
      //      If there is no next question to answer that means all quiz qustions are answered.
      //      Then frontend/user will be able to call /quiz/:id/report to get the quiz report.
      const questionToAnswer = await this.repository.getNextQuestion(
        dto.session_id,
        trx,
      );

      // Mark quiz session as completed
      if (!questionToAnswer) {
        // ToDo: Update quiz_sessions (quiz_statud_id=COMPLETED, completed_at=Now())
      }

      return {
        session,
        questionToAnswer: questionToAnswer || undefined,
        complete: !questionToAnswer,
      };
    });
  }

  async createOrGetReport(session_id: number) {
    return knex.transaction(async (trx) => {
      // Get session and validate
      const session = await this.quizSessionRepository.getByID(session_id, trx);

      if (!session) {
        throw new NotFoundError('Quiz session not found');
      }

      // Check if all questions are answered
      const questionToAnswer = await this.repository.getNextQuestion(
        session_id,
        trx,
      );

      if (questionToAnswer) {
        throw new ValidationError('Quiz session not completed yet');
      }

      // Check if quiz report already created
      const quizReport = await this.quizReportRepository.getBySessionId(
        session_id,
        trx,
      );

      // Create quiz report only if it's not already created
      if (!quizReport) {
        // ToDo: Calculate report values
        const total_score = 50;
        const percentage_score = 55;
        const summary_feedback = 'Good. Keep it up.';

        // Save the report
        const qrDto: CreateQuizReportRequest = {
          session_id: session_id,
          total_score: total_score,
          percentage_score: percentage_score,
          summary_feedback: summary_feedback,
        };
        const quizReportId = await this.quizReportRepository.create(qrDto, trx);

        // Update quiz_session table ???
        // ToDo: Calculate values and update quiz_session table
      }

      // Get Quiz Report - Summary
      const quizReportSummary = await this.repository.getQuizReportSummary(
        session_id,
        trx,
      );

      // Get Quiz Report - Questions & Answers
      const quizReportQuestionsAndAnswers =
        await this.repository.getQuizReportQuestionsAndAnswers(session_id, trx);

      return {
        session,
        quizReportSummary: quizReportSummary || undefined,
        questionsAndAnswers: quizReportQuestionsAndAnswers || [],
        reportReady: !!quizReportSummary,
      };
    });
  }
}
