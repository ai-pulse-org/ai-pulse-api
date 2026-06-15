import { Response } from 'express';

// Utility function to handle API responses
export const handleResponse = <T>(
  res: Response,
  status: number,
  message: string,
  data: T | null = null,
): void =>
  void res.status(status).json({
    status,
    message,
    data,
  });
