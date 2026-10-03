import { prisma } from "@/lib/prisma";
import { problems } from "@/features/questions/data/problems_client";
import { ISLANDS, ISLAND_MAP } from "@/features/islands/constants/islands";
import type { Island } from "@/features/islands/constants/islands";

function todayStr(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

// ─── Problem selection ────────────────────────────────────────────────────────

/**
 * Select 5 problems from an island that share a sub-pattern.
 * Picks a random sub-pattern, then filters problems tagged with that island's
 * category. Falls back to plain category filter if not enough found.
 */
function selectQuestProblems(island: Island): typeof problems {
  const categoryProblems = problems.filter(
    (p) => p.topics && p.topics.includes(island.category),
  );

  if (categoryProblems.length === 0) return [];

  // Try to pick a focused sub-pattern batch
  // We approximate sub-patterns by checking if problem titles contain keywords
  const patternKeywords: Record<string, string[]> = {
    "frequency count":          ["frequency", "count", "occurrences", "anagram", "majority"],
    "index mapping":            ["index", "two sum", "map", "hash"],
    "duplicate detection":      ["duplicate", "unique", "distinct"],
    "prefix sum":               ["prefix", "subarray sum", "range sum"],
    "opposite ends":            ["two sum ii", "container", "trapping", "valid palindrome"],
    "fast-slow pointer":        ["cycle", "middle", "happy"],
    "fixed window":             ["fixed", "substring", "maximum sum subarray"],
    "variable window":          ["longest", "minimum window", "at most"],
    "monotonic stack":          ["next greater", "daily temperatures", "largest rectangle"],
    "valid parentheses":        ["parentheses", "bracket", "valid"],
    "DFS traversal":            ["inorder", "preorder", "postorder", "path"],
    "BFS level-order":          ["level order", "zigzag", "right side"],
    "path sum":                 ["path sum", "root to leaf", "maximum path"],
    "BST operations":           ["BST", "search", "insert", "validate"],
    "k-th largest":             ["kth", "k largest", "k smallest"],
    "top-k elements":           ["top k", "k frequent", "k closest"],
    "subsets":                  ["subsets", "power set"],
    "permutations":             ["permutations", "permutation"],
    "combinations":             ["combinations", "combination sum"],
    "DFS connected components": ["number of islands", "connected", "provinces"],
    "BFS shortest path":        ["shortest path", "word ladder", "open the lock"],
    "topological sort":         ["course schedule", "topological", "prerequisites"],
    "climbing stairs / fibonacci": ["climbing stairs", "fibonacci", "tribonacci"],
    "house robber":             ["rob", "house robber"],
    "coin change":              ["coin change", "minimum coins"],
    "grid paths":               ["unique paths", "minimum path", "grid"],
    "edit distance / LCS":      ["edit distance", "longest common", "LCS"],
    "merge intervals":          ["merge intervals", "insert interval"],
    "meeting rooms":            ["meeting rooms", "meeting"],
    "XOR tricks":               ["xor", "single number", "missing number"],
    "bit masking":              ["bit mask", "subset", "subsets using bits"],
    "count set bits":           ["count bits", "hamming", "number of 1"],
    "prime sieve":              ["prime", "sieve", "primes"],
    "matrix rotation":          ["rotate", "matrix"],
    "spiral traversal":         ["spiral"],
    "Dijkstra":                 ["cheapest", "network delay", "path with minimum"],
    "Bellman-Ford":             ["bellman", "negative"],
    "Prim / Kruskal":           ["minimum spanning", "connecting cities"],
    "interval scheduling":      ["gas station", "jump game", "assign cookies"],
    "jump game":                ["jump game"],
    "binary search on answer":  ["koko", "search in rotated", "capacity"],
    "search in sorted array":   ["search", "find minimum", "peak"],
  };

  // Shuffle sub-patterns and try to find one with >= 3 problems
  const shuffledPatterns = [...island.subPatterns].sort(() => Math.random() - 0.5);

  for (const pattern of shuffledPatterns) {
    const keywords = patternKeywords[pattern] ?? [];
    if (keywords.length === 0) continue;

    const matched = categoryProblems.filter((p) =>
      keywords.some((kw) => p.title.toLowerCase().includes(kw.toLowerCase())),
    );

    if (matched.length >= 3) {
      // Take up to 5, sorted easy → medium → hard
      const sorted = matched.sort((a, b) => {
        const order = { easy: 0, medium: 1, hard: 2 };
        return (order[a.difficulty] ?? 1) - (order[b.difficulty] ?? 1);
      });
      return sorted.slice(0, 5);
    }
  }

  // Fallback: pick 5 from category sorted by difficulty
  const sorted = [...categoryProblems].sort((a, b) => {
    const order = { easy: 0, medium: 1, hard: 2 };
    return (order[a.difficulty] ?? 1) - (order[b.difficulty] ?? 1);
  });

  // Shuffle within difficulty groups for variety
  const shuffled = sorted.slice().sort((a, b) => {
    if (a.difficulty !== b.difficulty) {
      const order = { easy: 0, medium: 1, hard: 2 };
      return (order[a.difficulty] ?? 1) - (order[b.difficulty] ?? 1);
    }
    return Math.random() - 0.5;
  });

  return shuffled.slice(0, 5);
}

// ─── Public API ───────────────────────────────────────────────────────────────

export interface QuestProblem {
  position: number;     // 1–5
  slug: string;
  title: string;
  difficulty: string;
  completed: boolean;
  completedAt: Date | null;
  questId: string;
}

export interface TodayQuestState {
  date: string;
  category: string;
  island: ReturnType<typeof ISLAND_MAP["get"]>;
  problems: QuestProblem[];
  completedCount: number;
  isCleared: boolean;           // all 5 done
  islandProgress: IslandProgressSummary | null;
}

export interface IslandProgressSummary {
  totalClears: number;
  totalCompleted: number;
  currentStreak: number;
  lastClearedDate: string | null;
}

export interface IslandSummary {
  island: Island;
  islandProgress: IslandProgressSummary;
  isActiveToday: boolean;
  todayProgress: number;  // 0–5
}

/** Returns today's quest if an island has been chosen, else null. */
export async function getTodaysDailyQuest(): Promise<TodayQuestState | null> {
  const date = todayStr();
  const rows = await prisma.dailyQuest.findMany({
    where: { date },
    orderBy: { position: "asc" },
  });

  if (rows.length === 0) return null;

  const category = rows[0].category;
  const island = ISLAND_MAP.get(category) ?? undefined;
  const completedCount = rows.filter((r) => r.completed).length;

  return {
    date,
    category,
    island,
    problems: rows.map((r) => ({
      position: r.position,
      slug: r.problemSlug,
      title: problems.find((p) => p.slug === r.problemSlug)?.title ?? r.problemSlug,
      difficulty: problems.find((p) => p.slug === r.problemSlug)?.difficulty ?? "medium",
      completed: r.completed,
      completedAt: r.completedAt,
      questId: r.id,
    })),
    completedCount,
    isCleared: completedCount >= 5,
    islandProgress: await getIslandProgress(category),
  };
}

/** Choose today's island, generate 5 pattern-grouped problems, persist to DB. */
export async function chooseTodaysIsland(category: string): Promise<TodayQuestState> {
  const date = todayStr();
  const island = ISLAND_MAP.get(category);
  if (!island) throw new Error(`Unknown island: ${category}`);

  // Prevent re-choosing if already chosen today
  const existing = await prisma.dailyQuest.count({ where: { date } });
  if (existing > 0) throw new Error("Island already chosen for today");

  const selected = selectQuestProblems(island);
  if (selected.length === 0) throw new Error(`No problems found for ${category}`);

  // Take up to 5
  const batch = selected.slice(0, 5);

  await prisma.dailyQuest.createMany({
    data: batch.map((p, i) => ({
      date,
      category,
      problemSlug: p.slug,
      position: i + 1,
    })),
  });

  return (await getTodaysDailyQuest())!;
}

/** Mark one quest problem as complete (called after typing session finishes). */
export async function markQuestProblemComplete(
  questId: string,
): Promise<{ wasLastProblem: boolean }> {
  const quest = await prisma.dailyQuest.findUnique({ where: { id: questId } });
  if (!quest || quest.completed) return { wasLastProblem: false };

  await prisma.dailyQuest.update({
    where: { id: questId },
    data: { completed: true, completedAt: new Date() },
  });

  // Check if all 5 are now done
  const allDone = await prisma.dailyQuest.count({
    where: { date: quest.date, category: quest.category, completed: false },
  });

  const wasLastProblem = allDone === 0;

  if (wasLastProblem) {
    await updateIslandStreak(quest.category, quest.date);
  } else {
    // Just increment totalCompleted
    await prisma.islandProgress.upsert({
      where: { category: quest.category },
      update: { totalCompleted: { increment: 1 } },
      create: { category: quest.category, totalCompleted: 1 },
    });
  }

  return { wasLastProblem };
}

async function updateIslandStreak(category: string, date: string): Promise<void> {
  const progress = await prisma.islandProgress.findUnique({ where: { category } });

  let newStreak = 1;
  if (progress?.lastClearedDate) {
    // Check if cleared yesterday
    const last = new Date(progress.lastClearedDate);
    const today = new Date(date);
    const diffDays = Math.round((today.getTime() - last.getTime()) / 86400000);
    newStreak = diffDays === 1 ? (progress.currentStreak + 1) : 1;
  }

  await prisma.islandProgress.upsert({
    where: { category },
    update: {
      totalClears: { increment: 1 },
      totalCompleted: { increment: 1 },
      currentStreak: newStreak,
      lastClearedDate: date,
    },
    create: {
      category,
      totalClears: 1,
      totalCompleted: 5,
      currentStreak: 1,
      lastClearedDate: date,
    },
  });
}

async function getIslandProgress(category: string): Promise<IslandProgressSummary | null> {
  const p = await prisma.islandProgress.findUnique({ where: { category } });
  if (!p) return null;
  return {
    totalClears: p.totalClears,
    totalCompleted: p.totalCompleted,
    currentStreak: p.currentStreak,
    lastClearedDate: p.lastClearedDate,
  };
}

/** Summary of all 18 islands for the map view. */
export async function getAllIslandsSummary(): Promise<IslandSummary[]> {
  const date = todayStr();
  const [allProgress, todayQuests] = await Promise.all([
    prisma.islandProgress.findMany(),
    prisma.dailyQuest.findMany({ where: { date } }),
  ]);

  const progressMap = new Map(allProgress.map((p) => [p.category, p]));
  const activeCategory = todayQuests[0]?.category ?? null;
  const todayDoneCount = todayQuests.filter((q) => q.completed).length;

  return ISLANDS.map((island) => {
    const p = progressMap.get(island.category);
    return {
      island,
      islandProgress: p
        ? {
            totalClears: p.totalClears,
            totalCompleted: p.totalCompleted,
            currentStreak: p.currentStreak,
            lastClearedDate: p.lastClearedDate,
          }
        : { totalClears: 0, totalCompleted: 0, currentStreak: 0, lastClearedDate: null },
      isActiveToday: island.category === activeCategory,
      todayProgress: island.category === activeCategory ? todayDoneCount : 0,
    };
  });
}
