import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const settings = await prisma.githubSettings.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      return NextResponse.json({
        enabled: false,
        username: "",
        repoName: "yeetcode-solutions",
        hasToken: false,
      });
    }

    return NextResponse.json({
      enabled: settings.enabled,
      username: settings.username,
      repoName: settings.repoName,
      hasToken: !!settings.token,
    });
  } catch (error) {
    console.error("Failed to get GitHub settings:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { enabled, token, username, repoName } = body;

    const existing = await prisma.githubSettings.findUnique({
      where: { id: "default" },
    });

    // If they passed the masked placeholder, keep the old token.
    const tokenToSave = token === "••••••••••••••••" ? (existing?.token ?? "") : (token || "");

    const settings = await prisma.githubSettings.upsert({
      where: { id: "default" },
      create: {
        id: "default",
        enabled: enabled ?? false,
        token: tokenToSave,
        username: username || "",
        repoName: repoName || "yeetcode-solutions",
      },
      update: {
        enabled: enabled ?? false,
        token: tokenToSave,
        username: username || "",
        repoName: repoName || "yeetcode-solutions",
      },
    });

    return NextResponse.json({
      success: true,
      settings: {
        enabled: settings.enabled,
        username: settings.username,
        repoName: settings.repoName,
        hasToken: !!settings.token,
      },
    });
  } catch (error) {
    console.error("Failed to save GitHub settings:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
