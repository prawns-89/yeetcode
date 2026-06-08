import metaData from "./problems_meta.json";
import type { ProblemSummary } from "@/types";

export const problems = metaData as ProblemSummary[];

export const allTopics = [
  "all",
  "Algorithms"
] as const;

export function filterProblems({
  difficulty = "all",
  topic = "all",
  search = "",
}: {
  difficulty?: string;
  topic?: string;
  search?: string;
}): ProblemSummary[] {
  const q = search.toLowerCase().trim();
  return problems.filter((p) => {
    if (difficulty !== "all" && p.difficulty !== difficulty) return false;
    if (topic !== "all" && !p.topics.includes(topic)) return false;
    if (q && !p.title.toLowerCase().includes(q) && !String(p.number).includes(q))
      return false;
    return true;
  });
}
