import type { Difficulty } from "@/types";

export type ProblemSource = "leetcode" | "codeforces" | "cses";

export interface Problem {
  slug: string;
  number: number;
  title: string;
  difficulty: Difficulty;
  source: ProblemSource;
  topics: string[];
  description: string;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
  solutionCode: string;
}

export type DifficultyFilter = Difficulty | "all";
export type TopicFilter = string | "all";
