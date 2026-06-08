import { Card } from "@/components/ui/Card";
import type { SessionRecord } from "@/features/sessions/types";

interface RecentSessionsTableProps {
  sessions: SessionRecord[];
}

export function RecentSessionsTable({ sessions }: RecentSessionsTableProps) {
  return (
    <Card>
      <h3 className="mb-4 font-semibold text-foreground">Recent sessions</h3>
      {sessions.length === 0 ? (
        <p className="text-sm text-muted">
          Complete a typing session to see your history here.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="pb-3 pr-4 font-medium">Problem</th>
                <th className="pb-3 pr-4 font-medium">Mode</th>
                <th className="pb-3 pr-4 font-medium">WPM</th>
                <th className="pb-3 font-medium">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr
                  key={session.id}
                  className="border-b border-border/60 last:border-0"
                >
                  <td className="py-3 pr-4 text-foreground">
                    {session.snippetTitle}
                  </td>
                  <td className="py-3 pr-4 capitalize text-muted">
                    {session.mode}
                  </td>
                  <td className="py-3 pr-4 text-foreground">{session.netWpm}</td>
                  <td className="py-3 text-foreground">{session.accuracy}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
