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
}

export function QuestionTyping({ slug, title, code }: QuestionTypingProps) {
  const { saveFromTypingResult } = useSaveSession();

  const [sessionMode, setSessionMode] = useState<"typing" | "study">("typing");

  const handleComplete = async (result: TypingSessionResult) => {
    return saveFromTypingResult(result, {
      snippetId: `questions/${slug}`,
      snippetTitle: title,
      mode: "questions",
      errors: result.errors,
    });
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
