import { ModeCard } from "@/components/dashboard/ModeCard";
import { RecentSessionsTable } from "@/components/dashboard/RecentSessionsTable";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { AlgorithmsProgress } from "@/features/algorithms/components/AlgorithmsProgress";
import { QuestionsProgress } from "@/features/questions/components/QuestionsProgress";
import {
  getRecentSessions,
  getUserStats,
} from "@/features/sessions/lib/queries";
import { routes } from "@/lib/routes";

export default async function DashboardPage() {
  const [stats, recentSessions] = await Promise.all([
    getUserStats(),
    getRecentSessions(5),
  ]);

  return (
    <div>
      <PageHeader
        title="Welcome"
        description="Practice C++ syntax and type verified competitive programming solutions."
        action={
          <ButtonLink href={routes.select} variant="secondary">
            Start practicing
          </ButtonLink>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-muted">Sessions completed</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">
            {stats.sessionCount}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-muted">Best WPM</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">
            {stats.bestWpm ?? "—"}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-muted">Average accuracy</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">
            {stats.averageAccuracy !== null ? `${stats.averageAccuracy}%` : "—"}
          </p>
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
          description="Type verified solutions to curated LeetCode-style problems."
          progress={<QuestionsProgress />}
          href={routes.questions}
        />
      </div>

      <RecentSessionsTable sessions={recentSessions} />
    </div>
  );
}
