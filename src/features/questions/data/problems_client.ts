import metaData from "./problems_meta.json";
import type { ProblemSummary } from "@/types";

export const problems = metaData as ProblemSummary[];

// Extract all unique topics dynamically and sort by frequency
const getTopicsByFrequency = (): string[] => {
  const counts: Record<string, number> = {};
  for (const p of problems) {
    if (p.topics) {
      for (const t of p.topics) {
        if (t !== "All" && t !== "Algorithms") {
          counts[t] = (counts[t] || 0) + 1;
        }
      }
    }
  }
  const sorted = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  return ["all", ...sorted];
};

export const allTopics = getTopicsByFrequency();

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
