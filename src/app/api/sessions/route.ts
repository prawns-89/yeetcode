import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/features/auth/auth-options";
import { isRateLimited } from "@/features/sessions/lib/rate-limit";
import { saveTypingSession } from "@/features/sessions/lib/save-session";
import { validateSessionInput } from "@/features/sessions/lib/validation";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (isRateLimited(userId)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const input = validateSessionInput(body);
  if (!input) {
    return NextResponse.json({ error: "Invalid session data" }, { status: 400 });
  }

  const result = await saveTypingSession(userId, input);

  return NextResponse.json({
    sessionId: result.session.id,
    isPersonalBest: result.isPersonalBest,
  });
}
