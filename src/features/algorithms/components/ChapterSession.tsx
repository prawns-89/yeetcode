"use client";

import { useMemo, useState } from "react";
import { ChapterIntro } from "@/features/algorithms/components/ChapterIntro";
import { SnippetCard } from "@/features/algorithms/components/SnippetCard";
import { TypingCanvas } from "@/features/typing/components/TypingCanvas";
import type { TypingSessionResult } from "@/features/typing/types";
import {
  getChapterProgress,
  isChapterComplete,
  isChapterUnlocked,
} from "@/features/algorithms/lib/unlock";
import { snippetKey } from "@/features/algorithms/lib/keys";
import {
  useCompletedSnippetSet,
  useProgressStore,
} from "@/features/algorithms/store/progressStore";
import { useSaveSession } from "@/features/sessions/hooks/useSaveSession";
import type { AlgorithmChapter, AlgorithmTrack } from "@/features/algorithms/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type SessionStep = "intro" | "carousel" | "typing";

interface ChapterSessionProps {
  track: AlgorithmTrack;
  chapter: AlgorithmChapter;
  chapterIndex: number;
}

export function ChapterSession({
  track,
  chapter,
  chapterIndex,
}: ChapterSessionProps) {
  const completedSnippets = useCompletedSnippetSet();
  const recordAttempt = useProgressStore((state) => state.recordAttempt);
  const isSnippetComplete = useProgressStore((state) => state.isSnippetComplete);
  const { saveFromTypingResult } = useSaveSession();

  const unlocked = isChapterUnlocked(track, chapterIndex, completedSnippets);
  const progress = getChapterProgress(track.id, chapter, completedSnippets);
  const chapterDone = isChapterComplete(track.id, chapter, completedSnippets);

  const [step, setStep] = useState<SessionStep>("intro");
  const [activeSnippetId, setActiveSnippetId] = useState(
    chapter.snippets[0]?.id ?? "",
  );

  const activeSnippet = useMemo(
    () => chapter.snippets.find((snippet) => snippet.id === activeSnippetId),
    [chapter.snippets, activeSnippetId],
  );

  const handleComplete = async (result: TypingSessionResult) => {
    if (!activeSnippet) return null;
    recordAttempt(track.id, chapter.id, activeSnippet.id, {
      netWpm: result.netWpm,
      accuracy: result.accuracy,
    });
    return saveFromTypingResult(result, {
      snippetId: snippetKey(track.id, chapter.id, activeSnippet.id),
      snippetTitle: activeSnippet.title,
      mode: "algorithms",
      errors: result.errors,
    });
  };

  if (chapter.snippets.length === 0) {
    return (
      <Card>
        <p className="text-sm text-muted">Snippets for this chapter are coming soon.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {step === "intro" ? (
        <ChapterIntro
          track={track}
          chapter={chapter}
          chapterIndex={chapterIndex}
          unlocked={unlocked}
          onStart={() => setStep("carousel")}
        />
      ) : null}

      {step === "carousel" ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {chapter.title}
              </h2>
              <p className="text-sm text-muted">
                {progress.completed}/{progress.total} snippets complete
                {chapterDone ? " · Chapter complete" : ""}
              </p>
            </div>
            <Button variant="ghost" onClick={() => setStep("intro")}>
              Chapter info
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {chapter.snippets.map((snippet) => (
              <SnippetCard
                key={snippet.id}
                snippet={snippet}
                completed={isSnippetComplete(track.id, chapter.id, snippet.id)}
                selected={snippet.id === activeSnippetId}
                onSelect={() => {
                  setActiveSnippetId(snippet.id);
                  setStep("typing");
                }}
              />
            ))}
          </div>
        </div>
      ) : null}

      {step === "typing" && activeSnippet ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {activeSnippet.title}
              </h2>
              <p className="text-sm text-muted">{chapter.title}</p>
            </div>
            <Button variant="ghost" onClick={() => setStep("carousel")}>
              Back to snippets
            </Button>
          </div>
          
          <div className="grid gap-4 lg:grid-cols-[62%_38%]">
            <div className="flex flex-col">
              <TypingCanvas
                key={activeSnippet.id}
                code={activeSnippet.code}
                language={track.language ?? "C++"}
                onComplete={handleComplete}
              />
            </div>
            <Card className="flex flex-col h-full max-h-[32rem] overflow-y-auto p-5 border border-border bg-surface-elevated">
              <h3 className="text-base font-semibold text-foreground border-b border-border pb-2 mb-3">
                Code Intuition & Logic
              </h3>
              {activeSnippet.explanation ? (
                <div className="prose prose-invert max-w-none text-sm text-muted leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {activeSnippet.explanation}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="text-sm text-muted space-y-3">
                  <p>
                    <strong>Topic:</strong> {chapter.topic}
                  </p>
                  <p>
                    This snippet is part of the <em>{chapter.title}</em> chapter in <em>{track.name}</em>.
                  </p>
                  <p>
                    Focus on writing clean, idiomatic code. Typing builds muscle memory for syntax, keywords, and structural patterns.
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      ) : null}
    </div>
  );
}
