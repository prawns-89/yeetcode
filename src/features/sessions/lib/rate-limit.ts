const lastSaveByUser = new Map<string, number>();

const MIN_INTERVAL_MS = 10_000;

export function isRateLimited(userId: string): boolean {
  const last = lastSaveByUser.get(userId);
  const now = Date.now();
  if (last && now - last < MIN_INTERVAL_MS) {
    return true;
  }
  lastSaveByUser.set(userId, now);
  return false;
}
