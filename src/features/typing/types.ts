export type CharStatus = "pending" | "correct" | "incorrect";

export interface TypingMetrics {
  rawWpm: number;
  netWpm: number;
  accuracy: number;
  progress: number;
  elapsedSeconds: number;
  errors: number;
  typedChars: number;
}

export interface TypingSessionResult extends TypingMetrics {
  completed: boolean;
  secondsTaken: number;
}

export interface TypingSessionState {
  source: string;
  cursor: number;
  statuses: CharStatus[];
  errors: number;
  startedAt: number | null;
  finishedAt: number | null;
  isComplete: boolean;
  metrics: TypingMetrics;
}
