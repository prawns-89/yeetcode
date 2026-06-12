import { prisma } from "@/lib/prisma";
import type { AppMode } from "@/types";
import type { SessionRecord, UserStats, PersonalBestRecord } from "@/features/sessions/types";

export async function getRecentSessions(
  limit = 5,
): Promise<SessionRecord[]> {
  const sessions = await prisma.typingSession.findMany({
    orderBy: { attemptedAt: "desc" },
    take: limit,
  });

  return sessions.map((session) => ({
    id: session.id,
    snippetId: session.snippetId,
    snippetTitle: session.snippetTitle,
    mode: session.mode as AppMode,
    netWpm: session.netWpm,
    rawWpm: session.rawWpm,
    accuracy: session.accuracy,
    secondsTaken: session.secondsTaken,
    attemptedAt: session.attemptedAt.toISOString(),
  }));
}

export async function getUserStats(): Promise<UserStats> {
  const [aggregate, best] = await Promise.all([
    prisma.typingSession.aggregate({
      _count: { _all: true },
      _avg: { accuracy: true },
    }),
    prisma.typingSession.findFirst({
      orderBy: { netWpm: "desc" },
      select: { netWpm: true },
    }),
  ]);

  return {
    sessionCount: aggregate._count._all,
    bestWpm: best?.netWpm ?? null,
    averageAccuracy:
      aggregate._avg.accuracy === null
        ? null
        : Math.round(aggregate._avg.accuracy),
  };
}

export async function getPersonalBests(limit = 10): Promise<PersonalBestRecord[]> {
  const records = await prisma.personalBest.findMany({
    orderBy: { achievedAt: "desc" },
    take: limit,
  });

  return records.map((record) => ({
    snippetId: record.snippetId,
    snippetTitle: ("snippetTitle" in record ? (record as { snippetTitle?: string }).snippetTitle : "") || record.snippetId,
    bestNetWpm: record.bestNetWpm,
    bestAccuracy: record.bestAccuracy,
    achievedAt: record.achievedAt.toISOString(),
    isPersonalBest: true,
  }));
}
