import { notFound } from "next/navigation";
import { ProblemPanel } from "@/features/questions/components/ProblemPanel";
import { QuestionTyping } from "@/features/questions/components/QuestionTyping";
import { getProblemBySlug } from "@/features/questions/data/problems_server";

interface QuestionPageProps {
  params: { slug: string };
}

export default function QuestionPage({ params }: QuestionPageProps) {
  const problem = getProblemBySlug(params.slug);

  if (!problem) {
    notFound();
  }

  return (
    <div className="grid min-h-[calc(100vh-8rem)] gap-4 lg:grid-cols-[38%_62%]">
      <ProblemPanel problem={problem} />
      <QuestionTyping
        slug={problem.slug}
        title={problem.title}
        code={problem.solutionCode}
      />
    </div>
  );
}
