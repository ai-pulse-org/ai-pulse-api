import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { handleResponse } from '../utils/handleResponse';

// Request validation middleware
// A middleware function to validate incoming requests against a Zod schema
export const requestValidator =
  (schema: z.ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return handleResponse(
        res,
        400,
        'Validation error',
        z.treeifyError(result.error),
      );
    }

    req.body = result.data;
    next();
  };
