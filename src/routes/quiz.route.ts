import { Router } from 'express';
import { requestValidator } from '../middlewares/requestValidator';
import { CreateQuizSessionRequestSchema } from '../dtos/quiz.dto';
import { QuizController } from '../controllers/quiz.controller';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = Router();
const controller = new QuizController();

// POST /quiz/start/
// POST /quiz/answer/
// GET? /quiz/report/:{id}   (session_id)

router.post(
  '/start',
  requestValidator(CreateQuizSessionRequestSchema),
  asyncHandler(controller.startQuiz),
);

export default router;
