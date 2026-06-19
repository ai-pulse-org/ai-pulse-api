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

router.get('/:id', asyncHandler(controller.getQuiz));

router.post('/:id/report', asyncHandler(controller.createOrGetReport));

export default router;
