import { z } from 'zod';

export const DifficultyLevel = {
  BEGINNER: 1,
  INTERMEDIATE: 2,
  ADVANCED: 3,
} as const;

export type DifficultyLevelId =
  (typeof DifficultyLevel)[keyof typeof DifficultyLevel];

export const DifficultyLevelSchema = z.union([
  z.literal(DifficultyLevel.BEGINNER),
  z.literal(DifficultyLevel.INTERMEDIATE),
  z.literal(DifficultyLevel.ADVANCED),
]);
