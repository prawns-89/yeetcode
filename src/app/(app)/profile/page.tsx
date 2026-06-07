import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Placeholder } from "@/components/ui/Placeholder";

export default function ProfilePage() {
  return (
    <div>
      <PageHeader
        title="Profile"
        description="Session history and personal bests across snippets."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-elevated text-lg font-semibold">
            CT
          </div>
          <h2 className="mt-4 text-xl font-semibold">Your profile</h2>
          <p className="text-sm text-muted">Synced from OAuth session</p>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="font-semibold">Stats</h3>
          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted">Sessions</p>
              <p className="text-lg font-semibold">0</p>
            </div>
            <div>
              <p className="text-muted">Best WPM</p>
              <p className="text-lg font-semibold">—</p>
            </div>
            <div>
              <p className="text-muted">Avg accuracy</p>
              <p className="text-lg font-semibold">—</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <Placeholder
          title="Your records"
          description="Personal best WPM per snippet will appear here once sessions are persisted."
        />
      </div>
    </div>
  );
}
