"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { routes } from "@/lib/routes";
import type { AppMode } from "@/types";

const steps = ["Choose mode", "Choose language", "Ready to type"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<AppMode>("algorithms");
  const [saving, setSaving] = useState(false);

  const finish = async () => {
    setSaving(true);
    try {
      await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preferredMode: mode,
          onboardingComplete: true,
        }),
      });
    } catch {
      // continue even if save fails
    }
    setSaving(false);
    router.push(mode === "questions" ? routes.questions : routes.algorithms);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-muted">
          Step {step + 1} of {steps.length}
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-foreground">
          {steps[step]}
        </h1>
      </div>

      <Card>
        {step === 0 && (
          <div className="grid gap-3">
            {(["algorithms", "questions"] as AppMode[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setMode(option)}
                className={`rounded-lg border px-4 py-3 text-left capitalize transition-colors ${
                  mode === option
                    ? "border-accent bg-accent/10 text-foreground"
                    : "border-border text-muted hover:border-border-strong"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-2 text-sm text-muted">
            <p>C++ is the default language for all snippets and solutions.</p>
            <p className="rounded-lg border border-border bg-surface-elevated px-3 py-2 font-mono text-foreground">
              #include &lt;bits/stdc++.h&gt;
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2 text-sm text-muted">
            <p>You are all set. Pick a snippet and start typing.</p>
            <ul className="list-inside list-disc space-y-1">
              <li>Focus on accuracy first, speed follows</li>
              <li>Ctrl+R resets the current session</li>
              <li>Progress saves automatically</li>
            </ul>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() =>
              step === 0 ? router.push(routes.dashboard) : setStep(step - 1)
            }
          >
            Back
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={finish} disabled={saving}>
              Skip
            </Button>
            <Button
              onClick={() => (step === steps.length - 1 ? finish() : setStep(step + 1))}
              disabled={saving}
            >
              {step === steps.length - 1 ? (saving ? "Saving..." : "Start") : "Next"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
