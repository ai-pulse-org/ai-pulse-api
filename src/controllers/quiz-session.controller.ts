import { Request, Response } from 'express';
import { handleResponse } from '../utils/handleResponse';
import { QuizSessionService } from '../services/quiz-session.service';
import { BadRequestError } from '../errors/BadRequestError';
export class QuizSessionController {
  private service = new QuizSessionService();

  getAllQuizSessions = async (req: Request, res: Response): Promise<void> => {
    const sessions = await this.service.getAllQuizSessions();

    return handleResponse(
      res,
      200,
      'All Quiz Sessions fetched successfully',
      sessions,
    );
  };

  getQuizSessionByID = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      throw new BadRequestError('Invalid id');
    }

    const session = await this.service.getQuizSessionsByID(id);

    return handleResponse(
      res,
      200,
      'Quiz session fetched successfully',
      session,
    );
  };

  createQuizSession = async (req: Request, res: Response): Promise<void> => {
    const id = await this.service.addQuizSession(req.body);

    return handleResponse(res, 201, 'Quiz session created successfully', {
      id,
    });
  };

  updateQuizSession = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      throw new BadRequestError('Invalid id');
    }

    const updated = await this.service.updateQuizSession(id, req.body);

    return handleResponse(
      res,
      200,
      'Quiz session updated successfully',
      updated,
    );
  };
}
