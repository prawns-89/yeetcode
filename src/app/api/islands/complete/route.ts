import { NextResponse } from "next/server";
import { markQuestProblemComplete } from "@/features/islands/lib/daily-quest";

// POST /api/islands/complete — { questId: string }
export async function POST(req: Request) {
  try {
    const body = await req.json() as { questId?: string };
    if (!body.questId) {
      return NextResponse.json({ error: "questId required" }, { status: 400 });
    }
    const result = await markQuestProblemComplete(body.questId);
    return NextResponse.json(result);
  } catch (err) {
    console.error("[POST /api/islands/complete]", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
