import { Router } from 'express';
import { requestValidator } from '../middlewares/requestValidator';
import { CreateQuizSessionRequestSchema } from '../dtos/quiz-session.dto';
import { QuizSessionController } from '../controllers/quiz-session.controller';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = Router();
const controller = new QuizSessionController();

router.get('/quiz-sessions', asyncHandler(controller.getAllQuizSessions));
router.get('/quiz-sessions/:id', asyncHandler(controller.getQuizSessionByID));
router.post(
  '/quiz-sessions',
  requestValidator(CreateQuizSessionRequestSchema),
  asyncHandler(controller.createQuizSession),
);
router.patch('/quiz-sessions/:id', asyncHandler(controller.updateQuizSession));

export default router;
