import { Request, Response } from 'express';
import { handleResponse } from '../utils/handleResponse';
import { QuizService } from '../services/quiz.service';

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
}
