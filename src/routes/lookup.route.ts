import { Router } from 'express';
import { LookupController } from '../controllers/lookup.controller';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = Router();
const controller = new LookupController();

router.get('/categories', asyncHandler(controller.getCategories));

export default router;
