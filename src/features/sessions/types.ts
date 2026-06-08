import type { AppMode } from "@/types";

export interface SaveSessionInput {
  snippetId: string;
  snippetTitle: string;
  mode: AppMode;
  netWpm: number;
  rawWpm: number;
  accuracy: number;
  secondsTaken: number;
  errors: number;
  completed?: boolean;
}

export interface SessionRecord {
  id: string;
  snippetId: string;
  snippetTitle: string;
  mode: AppMode;
  netWpm: number;
  rawWpm: number;
  accuracy: number;
  secondsTaken: number;
  attemptedAt: string;
}

export interface PersonalBestRecord {
  snippetId: string;
  snippetTitle: string;
  bestNetWpm: number;
  bestAccuracy: number;
  achievedAt: string;
  isPersonalBest: boolean;
}

export interface UserStats {
  sessionCount: number;
  bestWpm: number | null;
  averageAccuracy: number | null;
}
