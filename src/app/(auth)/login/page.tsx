"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Code2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { routes } from "@/lib/routes";

export default function LoginPage() {
  const [devName, setDevName] = useState("developer");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDevLogin = async () => {
    setLoading(true);
    setError(null);
    const result = await signIn("dev", {
      username: devName,
      callbackUrl: routes.onboarding,
      redirect: false,
    });
    setLoading(false);

    if (result?.error) {
      setError("Dev login failed. Restart the dev server and try again.");
      return;
    }

    if (result?.url) {
      window.location.href = result.url;
    }
  };

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
        {process.env.NODE_ENV === "development" ? (
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">Dev login</p>
            <input
              value={devName}
              onChange={(event) => setDevName(event.target.value)}
              className="w-full rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
              placeholder="Username"
            />
            <Button
              variant="primary"
              className="w-full justify-center"
              onClick={handleDevLogin}
              disabled={loading}
            >
              Continue as {devName || "developer"}
            </Button>
          </div>
        ) : null}

        <div className={`space-y-3 ${process.env.NODE_ENV === "development" ? "mt-4 border-t border-border pt-4" : ""}`}>
          <Button
            variant="oauth"
            onClick={() => signIn("github", { callbackUrl: routes.onboarding })}
          >
            <Code2 className="h-4 w-4" />
            Continue with GitHub
          </Button>
          <Button
            variant="oauth"
            onClick={() => signIn("google", { callbackUrl: routes.onboarding })}
          >
            Continue with Google
          </Button>
        </div>

        {error ? (
          <p className="mt-4 text-center text-sm text-danger">{error}</p>
        ) : (
          <p className="mt-4 text-center text-xs text-muted">
            OAuth needs credentials in <code>.env.local</code>. Dev login works
            without them.
          </p>
        )}
      </Card>
    </div>
  );
}
