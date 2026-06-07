import type { AlgorithmTrack } from "@/features/algorithms/types";
import { snippetKey } from "@/features/algorithms/lib/keys";

const TRACK_UNLOCK_ACCURACY = 70;

export function isTrackUnlocked(
  track: AlgorithmTrack,
  tracks: AlgorithmTrack[],
  completedSnippets: Set<string>,
  snippetStats: Record<string, { accuracy: number }>,
): boolean {
  if (track.order === 1) return true;

  const previousTrack = tracks.find((item) => item.order === track.order - 1);
  if (!previousTrack) return false;

  return isTrackComplete(previousTrack, completedSnippets, snippetStats);
}

function isTrackComplete(
  track: AlgorithmTrack,
  completedSnippets: Set<string>,
  snippetStats: Record<string, { accuracy: number }>,
): boolean {
  const accuracies: number[] = [];

  for (const chapter of track.chapters) {
    for (const snippet of chapter.snippets) {
      const key = snippetKey(track.id, chapter.id, snippet.id);
      if (!completedSnippets.has(key)) return false;
      const stats = snippetStats[key];
      if (stats) accuracies.push(stats.accuracy);
    }
  }

  if (accuracies.length === 0) return false;
  const average =
    accuracies.reduce((sum, value) => sum + value, 0) / accuracies.length;
  return average >= TRACK_UNLOCK_ACCURACY;
}

export function isChapterUnlocked(
  track: AlgorithmTrack,
  chapterIndex: number,
  completedSnippets: Set<string>,
): boolean {
  if (chapterIndex === 0) return true;

  const previousChapter = track.chapters[chapterIndex - 1];
  if (!previousChapter) return false;

  return isChapterComplete(track.id, previousChapter, completedSnippets);
}

export function isChapterComplete(
  trackId: string,
  chapter: AlgorithmTrack["chapters"][number],
  completedSnippets: Set<string>,
): boolean {
  return chapter.snippets.every((snippet) =>
    completedSnippets.has(snippetKey(trackId, chapter.id, snippet.id)),
  );
}

export function getChapterProgress(
  trackId: string,
  chapter: AlgorithmTrack["chapters"][number],
  completedSnippets: Set<string>,
): { completed: number; total: number } {
  const completed = chapter.snippets.filter((snippet) =>
    completedSnippets.has(snippetKey(trackId, chapter.id, snippet.id)),
  ).length;
  return { completed, total: chapter.snippets.length };
}
