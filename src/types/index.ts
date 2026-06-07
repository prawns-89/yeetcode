export type AppMode = "algorithms" | "questions";

export type Difficulty = "easy" | "medium" | "hard";

export type League =
  | "bronze"
  | "silver"
  | "gold"
  | "platinum"
  | "diamond"
  | "master";

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export interface Track {
  id: string;
  name: string;
  description: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  topic: string;
  snippetCount: number;
  estimatedMinutes: number;
}

export interface ProblemSummary {
  slug: string;
  number: number;
  title: string;
  difficulty: Difficulty;
  source: "leetcode" | "codeforces" | "cses";
  topics: string[];
}

export interface SessionSummary {
  id: string;
  title: string;
  mode: AppMode;
  netWpm: number;
  accuracy: number;
  attemptedAt: string;
}
