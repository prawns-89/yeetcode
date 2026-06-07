"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { routes } from "@/lib/routes";
import { useUserStore } from "@/stores/userStore";
import type { AppMode } from "@/types";

const steps = ["Choose mode", "Choose language", "Calibrate speed"];

export default function OnboardingPage() {
  const router = useRouter();
  const { setPreferredMode, completeOnboarding } = useUserStore();
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<AppMode>("algorithms");

  const finish = () => {
    setPreferredMode(mode);
    completeOnboarding();
    router.push(routes.dashboard);
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
          <p className="text-sm text-muted">
            C++ is the only language in v1. Python and Java come post-launch.
          </p>
        )}

        {step === 2 && (
          <p className="text-sm text-muted">
            30-second warmup typing test will run here. Skipped in scaffolding.
          </p>
        )}

        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => (step === 0 ? router.push(routes.login) : setStep(step - 1))}
          >
            Back
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={finish}>
              Skip
            </Button>
            <Button
              onClick={() => (step === steps.length - 1 ? finish() : setStep(step + 1))}
            >
              {step === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
