"use client";

import { useState } from "react";
import { TypingCanvas } from "@/features/typing/components/TypingCanvas";
import { CodeStudyViewer } from "@/features/typing/components/CodeStudyViewer";
import type { TypingSessionResult } from "@/features/typing/types";
import { useSaveSession } from "@/features/sessions/hooks/useSaveSession";

interface QuestionTypingProps {
  slug: string;
  title: string;
  code: string;
  questId?: string;
}

export function QuestionTyping({ slug, title, code, questId }: QuestionTypingProps) {
  const { saveFromTypingResult } = useSaveSession();

  const [sessionMode, setSessionMode] = useState<"typing" | "study">("typing");

  const handleComplete = async (result: TypingSessionResult) => {
    const saveResult = await saveFromTypingResult(result, {
      snippetId: `questions/${slug}`,
      snippetTitle: title,
      mode: "questions",
      errors: result.errors,
    });

    if (saveResult?.isFirstClear) {
      try {
        fetch("/api/github/commit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            snippetId: `questions/${slug}`,
            snippetTitle: title,
            code: code,
            netWpm: result.netWpm,
            accuracy: result.accuracy,
          }),
        }).catch((err) => {
          console.error("Failed to commit to GitHub", err);
        });
      } catch (err) {
        console.error("Failed to commit to GitHub", err);
      }
    }

    // Mark quest problem complete if this session came from an island raid
    if (questId) {
      try {
        await fetch("/api/islands/complete", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ questId }),
        });
      } catch {
        // Non-critical — quest will still be markable next time
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex bg-surface-elevated rounded-md border border-border p-0.5 w-fit">
        <button
          onClick={() => setSessionMode("typing")}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            sessionMode === "typing" ? "bg-accent/10 text-accent font-medium" : "text-muted hover:text-foreground"
          }`}
        >
          Practice
        </button>
        <button
          onClick={() => setSessionMode("study")}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            sessionMode === "study" ? "bg-accent/10 text-accent font-medium" : "text-muted hover:text-foreground"
          }`}
        >
          Study Notes
        </button>
      </div>
      {sessionMode === "typing" ? (
        <TypingCanvas code={code} onComplete={handleComplete} />
      ) : (
        <CodeStudyViewer code={code} snippetId={`questions/${slug}`} />
      )}
    </div>
  );
}

