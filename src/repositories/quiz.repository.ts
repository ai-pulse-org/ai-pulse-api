import { db } from '../config/knex';
import {
  QuizQuestionAnswerRecord,
  QuizQuestionAnswerResponse,
  QuizReportSummaryRecord,
  QuizReportSummaryResponse,
  QuizReportQuestionsAndAnswersRecord,
  QuizReportQuestionsAndAnswersResponse,
} from '../dtos/quiz.dto';

export class QuizRepository {
  private mapNextQuestionToResponse(
    row: QuizQuestionAnswerRecord,
  ): QuizQuestionAnswerResponse {
    return {
      quiz_question_id: row.quiz_question_id,
      session_id: row.session_id,
      question_id: row.question_id,
      quiz_status_id: row.quiz_status_id,
      quiz_status: row.quiz_status,
      question: row.question,
      question_difficulty_level_id: row.question_difficulty_level_id,
      question_difficulty_level: row.question_difficulty_level,
      category_id: row.category_id,
      category: row.category,
    };
  }

  private mapQuizReportSummaryToResponse(
    row: QuizReportSummaryRecord,
  ): QuizReportSummaryResponse {
    return {
      session_id: row.session_id,
      difficulty_level_id: row.difficulty_level_id,
      difficulty_level: row.difficulty_level,
      total_questions: row.total_questions,
      current_question_index: row.current_question_index,
      quiz_status_id: row.quiz_status_id,
      quiz_status: row.quiz_status,
      score_total: row.score_total,
      session_created_at: row.session_created_at,
      completed_at: row.completed_at,
      report_id: row.report_id,
      total_score: row.total_score,
      percentage_score: row.percentage_score,
      summary_feedback: row.summary_feedback,
      report_created_at: row.report_created_at,
    };
  }

  private mapQuizReportQuestionsAndAnswersToResponse(
    row: QuizReportQuestionsAndAnswersRecord,
  ): QuizReportQuestionsAndAnswersResponse {
    return {
      quiz_question_id: row.quiz_question_id,
      question_id: row.question_id,
      question: row.question,
      question_order: row.question_order,
      category_id: row.category_id,
      category: row.category,
      answer_id: row.answer_id,
      user_answer: row.user_answer,
      answered_at: row.answered_at,
      score: row.score,
      feedback: row.feedback,
    };
  }

  async getNextQuestion(
    sessionId: number,
    trx?: any,
  ): Promise<QuizQuestionAnswerResponse | undefined> {
    const query = trx ?? db;
    const row: QuizQuestionAnswerRecord = await query(
      'vw_quiz_question_answers',
    )
      .where('session_id', sessionId)
      .whereNull('answered_at')
      .orderBy('question_order', 'asc')
      .first();

    if (!row) return undefined;
    return this.mapNextQuestionToResponse(row);
  }

  async getQuizReportSummary(
    sessionId: number,
    trx?: any,
  ): Promise<QuizReportSummaryResponse | undefined> {
    const query = trx ?? db;
    const row: QuizReportSummaryRecord = await query('vw_quiz_reports')
      .where('session_id', sessionId)
      .first();

    if (!row) return undefined;
    return this.mapQuizReportSummaryToResponse(row);
  }

  async getQuizReportQuestionsAndAnswers(
    sessionId: number,
    trx?: any,
  ): Promise<QuizReportQuestionsAndAnswersResponse[]> {
    const query = trx ?? db;
    const rows: QuizReportQuestionsAndAnswersRecord[] = await query(
      'vw_quiz_question_answers',
    )
      .where('session_id', sessionId)
      .whereNotNull('answered_at')
      .orderBy('question_order');

    return rows.map((row) =>
      this.mapQuizReportQuestionsAndAnswersToResponse(row),
    );
  }
}
