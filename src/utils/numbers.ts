export function normalizeProgress(
  value: number | undefined,
): number | undefined {
  return value !== undefined && Number.isFinite(value)
    ? Math.min(100, Math.max(0, value))
    : undefined;
}

export function positiveNumber(value: number, fallback: number): number {
  return Number.isFinite(value) && value > 0 ? value : fallback;
}
