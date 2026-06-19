export const DifficultyLevel = {
  BEGINNER: 1,
  INTERMEDIATE: 2,
  ADVANCED: 3,
} as const;

export type DifficultyLevelId =
  (typeof DifficultyLevel)[keyof typeof DifficultyLevel];
