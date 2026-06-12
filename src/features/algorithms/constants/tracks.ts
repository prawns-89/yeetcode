import type { AlgorithmTrack } from "@/features/algorithms/types";
import { track1Foundations } from "@/features/algorithms/constants/track1";
import { track2Intermediate } from "@/features/algorithms/constants/track2";
import { track3Searching } from "@/features/algorithms/constants/track3";
import { track4Graphs } from "@/features/algorithms/constants/track4";
import { track5CoreCpp } from "@/features/algorithms/constants/track5";
import { track6PythonML } from "@/features/algorithms/constants/track6";
import { track7PyTorch } from "@/features/algorithms/constants/track7";

export const algorithmTracks: AlgorithmTrack[] = [
  track1Foundations,
  track2Intermediate,
  track3Searching,
  track4Graphs,
  track5CoreCpp,
  track6PythonML,
  track7PyTorch,
];

export function getTrackById(trackId: string): AlgorithmTrack | undefined {
  return algorithmTracks.find((track) => track.id === trackId);
}

export function getChapter(
  trackId: string,
  chapterId: string,
): { track: AlgorithmTrack; chapter: AlgorithmTrack["chapters"][number] } | null {
  const track = getTrackById(trackId);
  if (!track) return null;
  const chapter = track.chapters.find((item) => item.id === chapterId);
  if (!chapter) return null;
  return { track, chapter };
}

export function getTotalSnippetCount(): number {
  return algorithmTracks.reduce(
    (sum, track) =>
      sum + track.chapters.reduce((s, ch) => s + ch.snippets.length, 0),
    0,
  );
}
