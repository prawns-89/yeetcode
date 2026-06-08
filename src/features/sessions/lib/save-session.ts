import { prisma } from "@/lib/prisma";
import type { SaveSessionInput } from "@/features/sessions/types";

export async function saveTypingSession(userId: string, input: SaveSessionInput) {
  const session = await prisma.typingSession.create({
    data: {
      userId,
      snippetId: input.snippetId,
      snippetTitle: input.snippetTitle,
      mode: input.mode,
      netWpm: input.netWpm,
      rawWpm: input.rawWpm,
      accuracy: input.accuracy,
      secondsTaken: input.secondsTaken,
      errors: input.errors,
      completed: input.completed ?? true,
    },
  });

  const existingBest = await prisma.personalBest.findUnique({
    where: {
      userId_snippetId: {
        userId,
        snippetId: input.snippetId,
      },
    },
  });

  const isPersonalBest =
    !existingBest || input.netWpm > existingBest.bestNetWpm;

  if (isPersonalBest) {
    await prisma.personalBest.upsert({
      where: {
        userId_snippetId: {
          userId,
          snippetId: input.snippetId,
        },
      },
      create: {
        userId,
        snippetId: input.snippetId,
        snippetTitle: input.snippetTitle,
        bestNetWpm: input.netWpm,
        bestAccuracy: input.accuracy,
        achievedAt: session.attemptedAt,
        sessionId: session.id,
      },
      update: {
        snippetTitle: input.snippetTitle,
        bestNetWpm: input.netWpm,
        bestAccuracy: input.accuracy,
        achievedAt: session.attemptedAt,
        sessionId: session.id,
      },
    });
  }

  const existingProgress = await prisma.curriculumProgress.findUnique({
    where: {
      userId_snippetId: {
        userId,
        snippetId: input.snippetId,
      },
    },
  });

  if (existingProgress) {
    await prisma.curriculumProgress.update({
      where: {
        userId_snippetId: {
          userId,
          snippetId: input.snippetId,
        },
      },
      data: {
        attemptCount: existingProgress.attemptCount + 1,
        lastNetWpm: input.netWpm,
        lastAccuracy: input.accuracy,
      },
    });
  } else {
    await prisma.curriculumProgress.create({
      data: {
        userId,
        snippetId: input.snippetId,
        firstCompletedAt: session.attemptedAt,
        attemptCount: 1,
        lastNetWpm: input.netWpm,
        lastAccuracy: input.accuracy,
      },
    });
  }

  return { session, isPersonalBest };
}
