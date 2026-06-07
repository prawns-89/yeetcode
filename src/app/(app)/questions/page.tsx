import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { DifficultyBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { placeholderProblems } from "@/constants/curriculum";
import { routes } from "@/lib/routes";

export default function QuestionsPage() {
  return (
    <div>
      <PageHeader
        title="Questions"
        description="Browse problems by difficulty, topic, or roadmap. Filter UI comes in M5."
      />

      <Card className="overflow-hidden p-0">
        <div className="border-b border-border px-4 py-3">
          <div className="flex flex-wrap gap-2 text-sm text-muted">
            <span className="rounded-md border border-border px-2 py-1">All</span>
            <span className="rounded-md border border-border px-2 py-1">Easy</span>
            <span className="rounded-md border border-border px-2 py-1">Medium</span>
            <span className="rounded-md border border-border px-2 py-1">Hard</span>
          </div>
        </div>

        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-elevated text-muted">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Difficulty</th>
              <th className="px-4 py-3 font-medium">Source</th>
              <th className="px-4 py-3 font-medium">Topics</th>
            </tr>
          </thead>
          <tbody>
            {placeholderProblems.map((problem) => (
              <tr
                key={problem.slug}
                className="border-b border-border/60 transition-colors hover:bg-surface-hover"
              >
                <td className="px-4 py-3 text-muted">{problem.number}</td>
                <td className="px-4 py-3">
                  <Link
                    href={routes.question(problem.slug)}
                    className="font-medium text-foreground hover:text-accent"
                  >
                    {problem.title}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <DifficultyBadge difficulty={problem.difficulty} />
                </td>
                <td className="px-4 py-3 uppercase text-muted">{problem.source}</td>
                <td className="px-4 py-3 text-muted">{problem.topics.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
