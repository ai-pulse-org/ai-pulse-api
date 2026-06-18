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
// POST? /quiz/:id/report/   (session_id)

// GET /quiz/:id   (session_id) - This is to resume/reload a quiz. Works same as POST: /quiz/start/ but doesn't start the new quiz

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

router.post('/:id/report', asyncHandler(controller.createOrGetReport));

export default router;
