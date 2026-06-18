import { CreateQuizReportRequest } from '../dtos/quiz-report.dto';
import { QuizReportRepository } from '../repositories/quiz-report.repository';

export class QuizReportService {
  private repository = new QuizReportRepository();

  async addQuizReport(dto: CreateQuizReportRequest): Promise<number> {
    return this.repository.create(dto);
  }
}
