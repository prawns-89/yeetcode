import { DifficultyBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { ProblemSummary } from "@/types";

interface ProblemPanelProps {
  problem: ProblemSummary;
}

export function ProblemPanel({ problem }: ProblemPanelProps) {
  return (
    <Card className="h-full overflow-y-auto">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted">#{problem.number}</span>
        <DifficultyBadge difficulty={problem.difficulty} />
        <span className="rounded-md border border-border px-2 py-0.5 text-xs uppercase text-muted">
          {problem.source}
        </span>
      </div>

      <h2 className="mt-4 text-xl font-semibold text-foreground">
        {problem.title}
      </h2>

      <div className="mt-6 flex gap-2 border-b border-border">
        {["Description", "Approach", "Similar"].map((tab, i) => (
          <button
            key={tab}
            type="button"
            className={`border-b-2 px-3 py-2 text-sm ${
              i === 0
                ? "border-accent text-foreground"
                : "border-transparent text-muted"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="prose prose-invert mt-6 max-w-none text-sm text-muted">
        <p>
          Problem statement will render here from markdown. This panel mirrors
          the LeetCode left sidebar with description, approach notes, and related
          problems.
        </p>
        <p className="mt-4">
          <strong className="text-foreground">Topics:</strong>{" "}
          {problem.topics.join(", ")}
        </p>
      </div>
    </Card>
  );
}
