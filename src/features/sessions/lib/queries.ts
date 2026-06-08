import { prisma } from "@/lib/prisma";
import type { AppMode } from "@/types";
import type { SessionRecord, UserStats } from "@/features/sessions/types";

export async function getRecentSessions(
  userId: string,
  limit = 5,
): Promise<SessionRecord[]> {
  const sessions = await prisma.typingSession.findMany({
    where: { userId },
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

export async function getUserStats(userId: string): Promise<UserStats> {
  const [aggregate, best] = await Promise.all([
    prisma.typingSession.aggregate({
      where: { userId },
      _count: { _all: true },
      _avg: { accuracy: true },
    }),
    prisma.typingSession.findFirst({
      where: { userId },
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

export async function getPersonalBests(userId: string, limit = 10) {
  return prisma.personalBest.findMany({
    where: { userId },
    orderBy: { achievedAt: "desc" },
    take: limit,
  });
}
