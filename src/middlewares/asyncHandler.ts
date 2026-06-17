import { Request, Response, NextFunction } from 'express';

// Async wrapper - Connects async errors to middleware
// A middleware function to handle asynchronous route handlers and catch errors
export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
