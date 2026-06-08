import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveTypingSession } from "@/features/sessions/lib/save-session";
import { validateSessionInput } from "@/features/sessions/lib/validation";

export async function GET() {
  const sessions = await prisma.typingSession.findMany({
    orderBy: { attemptedAt: "desc" },
    take: 50,
  });

  return NextResponse.json(sessions);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = validateSessionInput(body);

    if (!input) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { isPersonalBest } = await saveTypingSession(input);
    return NextResponse.json({ success: true, isPersonalBest });
  } catch (error) {
    console.error("Session save error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
