import { getServerSession } from "next-auth/next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { authOptions } from "@/features/auth/auth-options";
import { formatAttemptedAt } from "@/features/sessions/lib/format";
import {
  getPersonalBests,
  getRecentSessions,
  getUserStats,
} from "@/features/sessions/lib/queries";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const displayName = session?.user?.name ?? "User";
  const initials = displayName.slice(0, 2).toUpperCase();

  const [stats, recentSessions, personalBests] = userId
    ? await Promise.all([
        getUserStats(userId),
        getRecentSessions(userId, 10),
        getPersonalBests(userId, 10),
      ])
    : [
        { sessionCount: 0, bestWpm: null, averageAccuracy: null },
        [],
        [],
      ];

  return (
    <div>
      <PageHeader
        title="Profile"
        description="Session history and personal bests across all snippets."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-elevated text-lg font-semibold">
            {initials}
          </div>
          <h2 className="mt-4 text-xl font-semibold">{displayName}</h2>
          <p className="text-sm text-muted">{session?.user?.email}</p>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="font-semibold">Stats</h3>
          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted">Sessions</p>
              <p className="text-lg font-semibold">{stats.sessionCount}</p>
            </div>
            <div>
              <p className="text-muted">Best WPM</p>
              <p className="text-lg font-semibold">{stats.bestWpm ?? "—"}</p>
            </div>
            <div>
              <p className="text-muted">Avg accuracy</p>
              <p className="text-lg font-semibold">
                {stats.averageAccuracy !== null
                  ? `${stats.averageAccuracy}%`
                  : "—"}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="mb-4 font-semibold text-foreground">Recent sessions</h3>
          {recentSessions.length === 0 ? (
            <p className="text-sm text-muted">No sessions saved yet.</p>
          ) : (
            <ul className="space-y-3 text-sm">
              {recentSessions.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between border-b border-border/60 pb-3 last:border-0"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {item.snippetTitle}
                    </p>
                    <p className="text-muted">
                      {formatAttemptedAt(item.attemptedAt)} · {item.mode}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-foreground">{item.netWpm} WPM</p>
                    <p className="text-muted">{item.accuracy}%</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h3 className="mb-4 font-semibold text-foreground">Personal bests</h3>
          {personalBests.length === 0 ? (
            <p className="text-sm text-muted">
              Beat your best WPM on any snippet to see records here.
            </p>
          ) : (
            <ul className="space-y-3 text-sm">
              {personalBests.map((record) => (
                <li
                  key={record.snippetId}
                  className="flex items-center justify-between border-b border-border/60 pb-3 last:border-0"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {record.snippetTitle || record.snippetId}
                    </p>
                    <p className="text-muted">
                      {formatAttemptedAt(record.achievedAt.toISOString())}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-foreground">{record.bestNetWpm} WPM</p>
                    <p className="text-muted">{record.bestAccuracy}%</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
