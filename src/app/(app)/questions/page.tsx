import { getServerSession } from "next-auth/next";
import { PageHeader } from "@/components/layout/PageHeader";
import { QuestionsList } from "@/features/questions/components/QuestionsList";
import { problems } from "@/features/questions/data/problems_client";
import { authOptions } from "@/features/auth/auth-options";
import { prisma } from "@/lib/prisma";

export default async function QuestionsPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const completedRows = userId
    ? await prisma.curriculumProgress.findMany({
        where: {
          userId,
          snippetId: { startsWith: "questions/" },
        },
        select: { snippetId: true },
      })
    : [];

  const completedSlugs = new Set(
    completedRows.map((r) => r.snippetId.replace("questions/", "")),
  );

  return (
    <div>
      <PageHeader
        title="Questions"
        description={`${problems.length} curated NeetCode-style problems with verified C++ solutions.`}
      />
      <QuestionsList completedSlugs={completedSlugs} />
    </div>
  );
}
