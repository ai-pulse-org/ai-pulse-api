import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

// Centralized error handling middleware
// A middleware function to handle errors thrown in the application
const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error(err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    message: 'Internal Server Error',
  });
};

export default errorHandler;
