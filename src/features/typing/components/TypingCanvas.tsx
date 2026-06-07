"use client";

import { useEffect, useRef } from "react";
import { CharSpan } from "@/features/typing/components/CharSpan";
import { ResultModal } from "@/features/typing/components/ResultModal";
import { useTypingSession } from "@/features/typing/hooks/useTypingSession";
import { formatElapsed } from "@/features/typing/lib/metrics";
import type { TypingSessionResult } from "@/features/typing/types";

interface TypingCanvasProps {
  code: string;
  language?: string;
  onComplete?: (result: TypingSessionResult) => void;
}

export function TypingCanvas({
  code,
  language = "C++",
  onComplete,
}: TypingCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { session, result, showResult, reset, dismissResult } =
    useTypingSession(code, { onComplete });

  useEffect(() => {
    containerRef.current?.focus();
  }, [code]);

  const { metrics } = session;

  return (
    <>
      <div className="flex h-full min-h-[32rem] flex-col rounded-xl border border-border bg-surface outline-none">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-3 text-sm text-muted">
            <span className="rounded-md border border-border px-2 py-1">
              {language}
            </span>
            <span>Ctrl+R to reset</span>
          </div>
          <div className="flex gap-4 text-sm text-muted">
            <span>WPM {metrics.netWpm}</span>
            <span>Accuracy {metrics.accuracy}%</span>
            <span>{formatElapsed(metrics.elapsedSeconds)}</span>
            <span>{metrics.progress}%</span>
          </div>
        </div>

        <div
          ref={containerRef}
          tabIndex={0}
          className="flex-1 overflow-auto p-6 font-mono text-sm leading-7 outline-none"
          onClick={() => containerRef.current?.focus()}
        >
          {session.source.split("").map((char, index) => (
            <CharSpan
              key={`${index}-${char}`}
              char={char}
              status={session.statuses[index]}
              isCaret={index === session.cursor && !session.isComplete}
            />
          ))}
        </div>
      </div>

      <ResultModal
        open={showResult}
        result={result}
        onRetry={reset}
        onClose={dismissResult}
      />
    </>
  );
}
