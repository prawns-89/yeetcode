import { Card } from "@/components/ui/Card";
import type { SessionSummary } from "@/types";

const placeholderSessions: SessionSummary[] = [
  {
    id: "1",
    title: "std::vector basics",
    mode: "algorithms",
    netWpm: 72,
    accuracy: 96,
    attemptedAt: "Today",
  },
  {
    id: "2",
    title: "Two Sum",
    mode: "questions",
    netWpm: 68,
    accuracy: 94,
    attemptedAt: "Yesterday",
  },
];

export function RecentSessionsTable() {
  return (
    <Card>
      <h3 className="mb-4 font-semibold text-foreground">Recent sessions</h3>
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
            {placeholderSessions.map((session) => (
              <tr key={session.id} className="border-b border-border/60 last:border-0">
                <td className="py-3 pr-4 text-foreground">{session.title}</td>
                <td className="py-3 pr-4 capitalize text-muted">{session.mode}</td>
                <td className="py-3 pr-4 text-foreground">{session.netWpm}</td>
                <td className="py-3 text-foreground">{session.accuracy}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
