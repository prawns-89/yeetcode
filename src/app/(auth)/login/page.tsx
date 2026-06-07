import { Code2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { routes } from "@/lib/routes";

export default function LoginPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-lg font-bold text-accent">
          CT
        </div>
        <h1 className="text-2xl font-semibold text-foreground">CodeType</h1>
        <p className="mt-2 text-sm text-muted">
          Algorithm typing practice for competitive programmers
        </p>
      </div>

      <Card>
        <div className="space-y-3">
          <ButtonLink href={routes.onboarding} variant="oauth">
            <Code2 className="h-4 w-4" />
            Continue with GitHub
          </ButtonLink>
          <ButtonLink href={routes.onboarding} variant="oauth">
            Continue with Google
          </ButtonLink>
        </div>
        <p className="mt-4 text-center text-xs text-muted">
          OAuth wiring comes in M1. Buttons route to onboarding for now.
        </p>
      </Card>

      <div className="rounded-xl border border-dashed border-border bg-surface/50 p-8 text-center">
        <p className="text-sm text-muted">
          Typing canvas demo GIF placeholder
        </p>
      </div>
    </div>
  );
}
