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

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      username: true,
      preferredMode: true,
      onboardingComplete: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const update: Record<string, unknown> = {};

  if (data.preferredMode === "algorithms" || data.preferredMode === "questions") {
    update.preferredMode = data.preferredMode;
  }
  if (typeof data.onboardingComplete === "boolean") {
    update.onboardingComplete = data.onboardingComplete;
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: update,
    select: {
      username: true,
      preferredMode: true,
      onboardingComplete: true,
    },
  });

  return NextResponse.json(user);
}
