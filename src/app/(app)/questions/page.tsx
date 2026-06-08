import { PageHeader } from "@/components/layout/PageHeader";
import { QuestionsList } from "@/features/questions/components/QuestionsList";
import { problems } from "@/features/questions/data/problems_client";
import { prisma } from "@/lib/prisma";

export default async function QuestionsPage() {
  const completedRows = await prisma.curriculumProgress.findMany({
    where: {
      snippetId: { startsWith: "questions/" },
    },
    select: { snippetId: true },
  });

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
