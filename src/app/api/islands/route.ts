import { NextResponse } from "next/server";
import {
  getAllIslandsSummary,
  getTodaysDailyQuest,
  chooseTodaysIsland,
} from "@/features/islands/lib/daily-quest";

// GET /api/islands — returns map summary + today's quest
export async function GET() {
  try {
    const [summary, quest] = await Promise.all([
      getAllIslandsSummary(),
      getTodaysDailyQuest(),
    ]);
    return NextResponse.json({ summary, quest });
  } catch (err) {
    console.error("[GET /api/islands]", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}

// POST /api/islands — choose today's island { category: string }
export async function POST(req: Request) {
  try {
    const body = await req.json() as { category?: string };
    if (!body.category) {
      return NextResponse.json({ error: "category required" }, { status: 400 });
    }
    const quest = await chooseTodaysIsland(body.category);
    return NextResponse.json({ quest });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "internal";
    const status = msg === "Island already chosen for today" ? 409 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
