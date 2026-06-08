import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/features/auth/auth-options";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await prisma.curriculumProgress.findMany({
    where: { userId },
  });

  const completedSnippets = rows.map((r) => r.snippetId);
  const snippetStats = Object.fromEntries(
    rows.map((r) => [
      r.snippetId,
      {
        netWpm: r.lastNetWpm,
        accuracy: r.lastAccuracy,
        completedAt: r.firstCompletedAt.toISOString(),
      },
    ]),
  );

  return NextResponse.json({ completedSnippets, snippetStats });
}
