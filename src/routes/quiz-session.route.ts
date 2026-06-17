import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { CreateQuizSessionRequestSchema } from '../dtos/quiz-session.dto';
import { QuizSessionController } from '../controllers/quiz-session.controller';

const router = Router();
const controller = new QuizSessionController();

router.get('/quiz-sessions', controller.getQuizSessions);
router.get('/quiz-sessions/:id', controller.getQuizSessionByID);
router.post(
  '/quiz-sessions',
  validate(CreateQuizSessionRequestSchema),
  controller.createQuizSession,
);
router.patch('/quiz-sessions/:id', controller.updateQuizSession);
export default router;
