import { Request, Response } from 'express';
import { handleResponse } from '../utils/handleResponse';
import { getErrorMessage } from '../utils/getErrorMessage';
import { AppError } from '../errors/AppError';
import { QuizSessionService } from '../services/quiz-session.service';
export class QuizSessionController {
  private service = new QuizSessionService();

  getQuizSessions = async (req: Request, res: Response): Promise<void> => {
    try {
      const sessions = await this.service.getQuizSessions();

      return handleResponse(
        res,
        200,
        'Quiz sessions fetched successfully',
        sessions,
      );
    } catch (error: unknown) {
      console.error(error);
      return handleResponse(res, 500, getErrorMessage(error));
    }
  };

  getQuizSessionByID = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id)) {
        return handleResponse(res, 400, 'Invalid id');
      }

      const session = await this.service.getQuizSessionsByID(id);

      return handleResponse(
        res,
        200,
        'Quiz session fetched successfully',
        session,
      );
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof AppError) {
        return handleResponse(res, error.statusCode, error.message);
      }
      return handleResponse(res, 500, getErrorMessage(error));
    }
  };

  createQuizSession = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = await this.service.addQuizSession(req.body);

      return handleResponse(res, 201, 'Quiz session created successfully', {
        id,
      });
    } catch (error: unknown) {
      console.error(error);
      return handleResponse(res, 500, getErrorMessage(error));
    }
  };

  updateQuizSession = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id)) {
        return handleResponse(res, 400, 'Invalid id');
      }

      const updated = await this.service.updateQuizSession(id, req.body);

      return handleResponse(
        res,
        200,
        'Quiz session updated successfully',
        updated,
      );
    } catch (error: unknown) {
      console.error(error);
      return handleResponse(res, 500, getErrorMessage(error));
    }
  };
}
