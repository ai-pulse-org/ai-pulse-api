// This utility function is used to sanitize an update object by filtering out
// any fields that are not explicitly allowed.
// It takes in a data transfer object (dto) and an array of allowed field keys,
// and returns a new object containing only the allowed fields that are present in the dto and are not undefined.
export function sanitizeUpdate<T extends object, K extends keyof T>(
  dto: T,
  allowedFields: readonly K[],
): Partial<Pick<T, K>> {
  const result: Partial<Pick<T, K>> = {};

  for (const key of allowedFields) {
    if (dto[key] !== undefined) {
      result[key] = dto[key];
    }
  }

  return result;
}
