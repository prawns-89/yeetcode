"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DifficultyBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { allTopics, filterProblems } from "@/features/questions/data/problems_client";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/cn";

const difficulties = ["all", "easy", "medium", "hard"] as const;

interface QuestionsListProps {
  completedSlugs: Set<string>;
}

export function QuestionsList({ completedSlugs }: QuestionsListProps) {
  const [difficulty, setDifficulty] = useState<string>("all");
  const [topic, setTopic] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => filterProblems({ difficulty, topic, search }),
    [difficulty, topic, search],
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search problems..."
          className="w-full rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-foreground outline-none focus:border-accent sm:max-w-xs"
        />
        <p className="text-sm text-muted">
          {filtered.length} problems · {completedSlugs.size} completed
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {difficulties.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDifficulty(d)}
            className={cn(
              "rounded-md border px-3 py-1 text-sm capitalize transition-colors",
              difficulty === d
                ? "border-accent bg-accent/10 text-foreground"
                : "border-border text-muted hover:border-border-strong",
            )}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {allTopics.slice(0, 8).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTopic(t)}
            className={cn(
              "rounded-md border px-2 py-1 text-xs transition-colors",
              topic === t
                ? "border-accent bg-accent/10 text-foreground"
                : "border-border text-muted",
            )}
          >
            {t === "all" ? "All topics" : t}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden p-0">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-elevated text-muted">
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Difficulty</th>
              <th className="px-4 py-3 font-medium">Topics</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((problem) => {
              const done = completedSlugs.has(`questions/${problem.slug}`);
              return (
                <tr
                  key={problem.slug}
                  className="border-b border-border/60 transition-colors hover:bg-surface-hover"
                >
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-block h-2.5 w-2.5 rounded-full",
                        done ? "bg-success" : "bg-border",
                      )}
                    />
                  </td>
                  <td className="px-4 py-3 text-muted">{problem.number}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={routes.question(problem.slug)}
                      className="font-medium text-foreground hover:text-accent"
                    >
                      {problem.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <DifficultyBadge difficulty={problem.difficulty} />
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {problem.topics.join(", ")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
