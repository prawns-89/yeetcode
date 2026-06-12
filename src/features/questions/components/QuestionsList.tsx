"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DifficultyBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { allTopics, filterProblems, problems } from "@/features/questions/data/problems_client";
import neetcode150List from "../data/neetcode_150.json";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/cn";

const difficulties = ["all", "easy", "medium", "hard"] as const;

const neetcodeCategories = [
  "all",
  "Arrays & Hashing",
  "Two Pointers",
  "Sliding Window",
  "Stack",
  "Binary Search",
  "Linked List",
  "Trees",
  "Tries",
  "Heap / Priority Queue",
  "Backtracking",
  "Graphs",
  "Advanced Graphs",
  "1-D Dynamic Programming",
  "2-D Dynamic Programming",
  "Greedy",
  "Intervals",
  "Math & Geometry",
  "Bit Manipulation",
] as const;

interface QuestionsListProps {
  completedSlugs: Set<string>;
}

type PlaylistMode = "all" | "neetcode150";

export function QuestionsList({ completedSlugs }: QuestionsListProps) {
  const searchParams = useSearchParams();
  const initialPlaylist = searchParams.get("playlist") === "neetcode150" ? "neetcode150" : "all";
  const [playlist, setPlaylist] = useState<PlaylistMode>(initialPlaylist);
  const [difficulty, setDifficulty] = useState<string>("all");
  const [topic, setTopic] = useState<string>("all");
  const [neetcodeCategory, setNeetcodeCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  // Map and match the NeetCode 150 list with local meta problems
  const neetcodeProblems = useMemo(() => {
    return neetcode150List
      .map((item) => {
        const pMeta = problems.find((p) => p.slug === item.slug);
        return pMeta ? { ...pMeta, neetcodeCategory: item.category } : null;
      })
      .filter(Boolean) as (typeof problems[number] & { neetcodeCategory: string })[];
  }, []);

  // Compute completed count specifically for NeetCode 150
  const neetcodeCompletedCount = useMemo(() => {
    return neetcode150List.filter((item) => completedSlugs.has(item.slug)).length;
  }, [completedSlugs]);

  const neetcodePercent = useMemo(() => {
    return Math.round((neetcodeCompletedCount / 150) * 100);
  }, [neetcodeCompletedCount]);

  // Filter problems depending on the active playlist
  const filtered = useMemo(() => {
    if (playlist === "all") {
      return filterProblems({ difficulty, topic, search });
    } else {
      return neetcodeProblems.filter((p) => {
        const matchesDiff = difficulty === "all" || p.difficulty === difficulty;
        const matchesCat = neetcodeCategory === "all" || p.neetcodeCategory === neetcodeCategory;
        const matchesSearch =
          search === "" ||
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.number.toString().includes(search);
        return matchesDiff && matchesCat && matchesSearch;
      });
    }
  }, [playlist, difficulty, topic, neetcodeCategory, search, neetcodeProblems]);

  return (
    <div className="space-y-4">
      {/* Playlist Toggle */}
      <div className="flex border-b border-border">
        <button
          type="button"
          onClick={() => {
            setPlaylist("all");
            setDifficulty("all");
            setTopic("all");
          }}
          className={cn(
            "px-4 py-2.5 text-sm font-semibold border-b-2 transition-all",
            playlist === "all"
              ? "border-accent text-foreground"
              : "border-transparent text-muted hover:text-foreground",
          )}
        >
          All Problems
        </button>
        <button
          type="button"
          onClick={() => {
            setPlaylist("neetcode150");
            setDifficulty("all");
            setNeetcodeCategory("all");
          }}
          className={cn(
            "px-4 py-2.5 text-sm font-semibold border-b-2 transition-all flex items-center gap-2",
            playlist === "neetcode150"
              ? "border-accent text-foreground"
              : "border-transparent text-muted hover:text-foreground",
          )}
        >
          NeetCode 150
          <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent font-medium">
            {neetcodeCompletedCount}/150
          </span>
        </button>
      </div>

      {/* NeetCode Progress Bar */}
      {playlist === "neetcode150" && (
        <div className="flex flex-col gap-2 p-4 rounded-xl border border-border bg-surface-elevated/40">
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-foreground">NeetCode 150 Curriculum Progress</span>
            <span className="text-muted font-mono">{neetcodeCompletedCount} / 150 completed ({neetcodePercent}%)</span>
          </div>
          <div className="h-2.5 w-full bg-border/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-500 ease-out rounded-full"
              style={{ width: `${neetcodePercent}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search problems..."
          className="w-full rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-foreground outline-none focus:border-accent sm:max-w-xs"
        />
        <p className="text-sm text-muted">
          {filtered.length} problems shown ·{" "}
          {playlist === "all" ? `${completedSlugs.size} completed` : `${neetcodeCompletedCount} completed`}
        </p>
      </div>

      {/* Difficulty Filter */}
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

      {/* Topic/Category Filter */}
      {playlist === "all" ? (
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
      ) : (
        <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1 border border-border/40 rounded-lg bg-surface-elevated/20">
          {neetcodeCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setNeetcodeCategory(c)}
              className={cn(
                "rounded-md border px-2.5 py-1 text-xs transition-colors",
                neetcodeCategory === c
                  ? "border-accent bg-accent/10 text-foreground font-medium"
                  : "border-border text-muted hover:text-foreground",
              )}
            >
              {c === "all" ? "All categories" : c}
            </button>
          ))}
        </div>
      )}

      {/* Table grid */}
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-border bg-surface-elevated text-muted">
                <th className="px-4 py-3 font-medium w-16 text-center">Status</th>
                <th className="px-4 py-3 font-medium w-16">#</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium w-28">Difficulty</th>
                <th className="px-4 py-3 font-medium w-64">
                  {playlist === "all" ? "Topics" : "NeetCode Category"}
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((problem) => {
                const done = completedSlugs.has(problem.slug);
                return (
                  <tr
                    key={problem.slug}
                    className="border-b border-border/60 transition-colors hover:bg-surface-hover"
                  >
                    <td className="px-4 py-3 text-center">
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
                      {playlist === "all" ? (
                        problem.topics.join(", ")
                      ) : (
                        <span className="rounded bg-surface-elevated border border-border px-2 py-0.5 text-xs text-foreground font-medium">
                          {"neetcodeCategory" in problem ? (problem as { neetcodeCategory: string }).neetcodeCategory : ""}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
