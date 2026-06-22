import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const snippetId = searchParams.get("snippetId");

  if (!snippetId) {
    return NextResponse.json(
      { error: "snippetId is required" },
      { status: 400 },
    );
  }

  try {
    const notes = await prisma.snippetNote.findMany({
      where: { snippetId },
      orderBy: { lineIndex: "asc" },
    });
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { snippetId, lineIndex, note } = body;

    if (!snippetId || typeof lineIndex !== "number" || typeof note !== "string") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    if (note.trim() === "") {
      // If note is empty, delete it
      await prisma.snippetNote.deleteMany({
        where: { snippetId, lineIndex },
      });
      return NextResponse.json({ success: true, deleted: true });
    }

    const savedNote = await prisma.snippetNote.upsert({
      where: {
        snippetId_lineIndex: {
          snippetId,
          lineIndex,
        },
      },
      update: {
        note,
      },
      create: {
        snippetId,
        lineIndex,
        note,
      },
    });

    return NextResponse.json(savedNote);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save note" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "id is required" },
        { status: 400 },
      );
    }

    await prisma.snippetNote.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 },
    );
  }
}
