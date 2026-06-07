import type { TypingMetrics } from "@/features/typing/types";

export function computeMetrics({
  typedChars,
  errors,
  totalChars,
  elapsedMs,
}: {
  typedChars: number;
  errors: number;
  totalChars: number;
  elapsedMs: number;
}): TypingMetrics {
  const elapsedMinutes = Math.max(elapsedMs / 60000, 1 / 60000);
  const correctChars = Math.max(typedChars - errors, 0);
  const rawWpm = (typedChars / 5) / elapsedMinutes;
  const netWpm = (correctChars / 5) / elapsedMinutes;
  const accuracy =
    typedChars === 0 ? 100 : Math.round((correctChars / typedChars) * 100);
  const progress =
    totalChars === 0 ? 0 : Math.round((typedChars / totalChars) * 100);

  return {
    rawWpm: Math.round(rawWpm),
    netWpm: Math.round(netWpm),
    accuracy,
    progress: Math.min(progress, 100),
    elapsedSeconds: Math.floor(elapsedMs / 1000),
    errors,
    typedChars,
  };
}

export function formatElapsed(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
