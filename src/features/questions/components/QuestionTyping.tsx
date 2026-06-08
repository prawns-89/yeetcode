"use client";

import { TypingCanvas } from "@/features/typing/components/TypingCanvas";
import type { TypingSessionResult } from "@/features/typing/types";
import { useSaveSession } from "@/features/sessions/hooks/useSaveSession";

interface QuestionTypingProps {
  slug: string;
  title: string;
  code: string;
}

export function QuestionTyping({ slug, title, code }: QuestionTypingProps) {
  const { saveFromTypingResult } = useSaveSession();

  const handleComplete = async (result: TypingSessionResult) => {
    return saveFromTypingResult(result, {
      snippetId: `questions/${slug}`,
      snippetTitle: title,
      mode: "questions",
      errors: result.errors,
    });
  };

  return <TypingCanvas code={code} onComplete={handleComplete} />;
}
