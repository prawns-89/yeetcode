import { ModeCard } from "@/components/dashboard/ModeCard";
import { AlgorithmsProgress } from "@/features/algorithms/components/AlgorithmsProgress";
import { RecentSessionsTable } from "@/components/dashboard/RecentSessionsTable";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { routes } from "@/lib/routes";

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Your hub for algorithms curriculum and LeetCode-style typing practice."
        action={
          <ButtonLink href={routes.select} variant="secondary">
            Start practicing
          </ButtonLink>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-muted">Sessions completed</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">0</p>
        </Card>
        <Card>
          <p className="text-sm text-muted">Average WPM</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">—</p>
        </Card>
        <Card>
          <p className="text-sm text-muted">Average accuracy</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">—</p>
        </Card>
      </div>

      <div className="mb-8 grid gap-4 lg:grid-cols-2">
        <ModeCard
          mode="algorithms"
          title="Algorithms"
          description="Structured C++ STL curriculum from foundations through graphs and DP."
          progress={<AlgorithmsProgress />}
          href={routes.algorithms}
        />
        <ModeCard
          mode="questions"
          title="Questions"
          description="Type verified solutions to LeetCode, Codeforces, and CSES problems."
          progress="NeetCode 150 · 0 completed"
          href={routes.questions}
        />
      </div>

      <RecentSessionsTable />
    </div>
  );
}
