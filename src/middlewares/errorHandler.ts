import { Request, Response, NextFunction } from 'express';

// Centralized error handling middleware
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error(err.stack);

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    error: err.message,
  });
};

export default errorHandler;
