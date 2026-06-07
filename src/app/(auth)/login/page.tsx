"use client";

import { signIn } from "next-auth/react";
import { Code2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

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
          <Button
            variant="oauth"
            onClick={() => signIn("github", { callbackUrl: "/onboarding" })}
          >
            <Code2 className="h-4 w-4" />
            Continue with GitHub
          </Button>
          <Button
            variant="oauth"
            onClick={() => signIn("google", { callbackUrl: "/onboarding" })}
          >
            Continue with Google
          </Button>
        </div>
        <p className="mt-4 text-center text-xs text-muted">
          Set OAuth credentials in <code>.env.local</code> (see{" "}
          <code>.env.example</code>).
        </p>
      </Card>

      <div className="rounded-xl border border-dashed border-border bg-surface/50 p-8 text-center">
        <p className="text-sm text-muted">Typing canvas preview</p>
      </div>
    </div>
  );
}
