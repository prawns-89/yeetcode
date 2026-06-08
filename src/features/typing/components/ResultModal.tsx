"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { TypingSessionResult } from "@/features/typing/types";

interface ResultModalProps {
  open: boolean;
  result: TypingSessionResult;
  isPersonalBest?: boolean;
  onRetry: () => void;
  onClose: () => void;
}

export function ResultModal({
  open,
  result,
  isPersonalBest = false,
  onRetry,
  onClose,
}: ResultModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <Card className="w-full max-w-md">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-foreground">
            Session complete
          </h2>
          {isPersonalBest ? (
            <span className="rounded-md bg-accent/20 px-2 py-0.5 text-xs font-medium text-accent">
              New PB!
            </span>
          ) : null}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted">Net WPM</p>
            <p className="text-2xl font-semibold text-foreground">
              {result.netWpm}
            </p>
          </div>
          <div>
            <p className="text-muted">Raw WPM</p>
            <p className="text-2xl font-semibold text-foreground">
              {result.rawWpm}
            </p>
          </div>
          <div>
            <p className="text-muted">Accuracy</p>
            <p className="text-2xl font-semibold text-foreground">
              {result.accuracy}%
            </p>
          </div>
          <div>
            <p className="text-muted">Time</p>
            <p className="text-2xl font-semibold text-foreground">
              {result.secondsTaken}s
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted">
          {result.errors} error{result.errors === 1 ? "" : "s"} ·{" "}
          {result.typedChars} characters typed
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onRetry}>Try again</Button>
        </div>
      </Card>
    </div>
  );
}
