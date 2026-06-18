import { Router } from 'express';
import { requestValidator } from '../middlewares/requestValidator';
import {
  StartQuizRequestSchema,
  SubmitAnswerRequestSchema,
} from '../dtos/quiz.dto';
import { QuizController } from '../controllers/quiz.controller';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = Router();
const controller = new QuizController();

// POST /quiz/start/
// POST /quiz/answer/
// GET? /quiz/report/:{id}   (session_id)

router.post(
  '/start',
  requestValidator(StartQuizRequestSchema),
  asyncHandler(controller.startQuiz),
);

router.post(
  '/answer',
  requestValidator(SubmitAnswerRequestSchema),
  asyncHandler(controller.submitAnswer),
);

export default router;
