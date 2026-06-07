import { notFound } from "next/navigation";
import { ProblemPanel } from "@/components/questions/ProblemPanel";
import { TypingCanvas } from "@/features/typing/components/TypingCanvas";
import { placeholderProblems } from "@/constants/curriculum";

interface QuestionPageProps {
  params: { slug: string };
}

export default function QuestionPage({ params }: QuestionPageProps) {
  const problem = placeholderProblems.find((item) => item.slug === params.slug);

  if (!problem) {
    notFound();
  }

  return (
    <div className="grid min-h-[calc(100vh-8rem)] gap-4 lg:grid-cols-[38%_62%]">
      <ProblemPanel problem={problem} />
      <TypingCanvas code={problem.solutionCode} />
    </div>
  );
}
