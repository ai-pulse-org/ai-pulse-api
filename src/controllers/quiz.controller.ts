import { Request, Response } from 'express';
import { handleResponse } from '../utils/handleResponse';
import { QuizService } from '../services/quiz.service';
import { BadRequestError } from '../errors/BadRequestError';

export class QuizController {
  private service = new QuizService();

  startQuiz = async (req: Request, res: Response): Promise<void> => {
    const quiz = await this.service.startQuiz(req.body);

    return handleResponse(res, 201, 'Quiz started successfully', {
      quiz,
    });
  };

  submitAnswer = async (req: Request, res: Response): Promise<void> => {
    const quiz = await this.service.submitAnswer(req.body);

    return handleResponse(res, 201, 'Answer submitted successfully', {
      quiz,
    });
  };

  getQuiz = async (req: Request, res: Response): Promise<void> => {
    const session_id = Number(req.params.id);

    if (Number.isNaN(session_id)) {
      throw new BadRequestError('Invalid session id');
    }

    const quiz = await this.service.getQuiz(session_id);

    return handleResponse(res, 200, 'Quiz fetched successfully', {
      quiz,
    });
  };

  createOrGetReport = async (req: Request, res: Response): Promise<void> => {
    const session_id = Number(req.params.id);

    if (Number.isNaN(session_id)) {
      throw new BadRequestError('Invalid session id');
    }

    const report = await this.service.createOrGetReport(session_id);

    return handleResponse(res, 200, 'Quiz report fetched successfully', {
      report,
    });
  };
}
