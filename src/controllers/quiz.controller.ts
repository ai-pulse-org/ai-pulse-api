import { Request, Response } from 'express';
import { handleResponse } from '../utils/handleResponse';
import { QuizService } from '../services/quiz.service';

export class QuizController {
  private service = new QuizService();

  test = async (req: Request, res: Response): Promise<void> => {
    const quiz = await this.service.test();

    return handleResponse(res, 200, 'Test success', quiz);
  };

  startQuiz = async (req: Request, res: Response): Promise<void> => {
    const id = await this.service.startQuiz(req.body);

    return handleResponse(res, 201, 'Quiz session started successfully', {
      id,
    });
  };
}
