"use client";

import { track1Foundations } from "@/features/algorithms/constants/track1";
import { getChapterProgress } from "@/features/algorithms/lib/unlock";
import { useCompletedSnippetSet } from "@/features/algorithms/store/progressStore";

export function AlgorithmsProgress() {
  const completedSnippets = useCompletedSnippetSet();

  const totalSnippets = track1Foundations.chapters.reduce(
    (sum, chapter) => sum + chapter.snippets.length,
    0,
  );
  const completedCount = track1Foundations.chapters.reduce((sum, chapter) => {
    const chapterProgress = getChapterProgress(
      track1Foundations.id,
      chapter,
      completedSnippets,
    );
    return sum + chapterProgress.completed;
  }, 0);

  return (
    <span>
      Track 1 · {completedCount}/{totalSnippets} snippets
    </span>
  );
}
