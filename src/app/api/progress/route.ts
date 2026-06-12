import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const progress = await prisma.curriculumProgress.findMany();

  const completedSnippets = progress.map((p) => p.snippetId);
  const snippetStats: Record<string, { completedAt: string; netWpm: number; accuracy: number }> = {};
  
  progress.forEach((p) => {
    snippetStats[p.snippetId] = {
      completedAt: p.firstCompletedAt.toISOString(),
      netWpm: p.lastNetWpm,
      accuracy: p.lastAccuracy,
    };
  });

  return NextResponse.json({
    completedSnippets,
    snippetStats,
  });
}
