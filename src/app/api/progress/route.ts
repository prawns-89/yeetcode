import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const progress = await prisma.curriculumProgress.findMany();
  return NextResponse.json(progress);
}
