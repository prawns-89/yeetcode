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
import {
  useCompletedSnippetSet,
  useProgressStore,
} from "@/features/algorithms/store/progressStore";
import type { AlgorithmChapter, AlgorithmTrack } from "@/features/algorithms/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

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

  const handleComplete = (result: TypingSessionResult) => {
    if (!activeSnippet) return;
    recordAttempt(track.id, chapter.id, activeSnippet.id, {
      netWpm: result.netWpm,
      accuracy: result.accuracy,
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
          <TypingCanvas
            key={activeSnippet.id}
            code={activeSnippet.code}
            onComplete={handleComplete}
          />
        </div>
      ) : null}
    </div>
  );
}
