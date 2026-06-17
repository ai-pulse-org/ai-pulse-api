import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { handleResponse } from '../utils/handleResponse';

export const validate =
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
