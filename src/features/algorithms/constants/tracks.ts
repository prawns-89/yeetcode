import type { AlgorithmTrack } from "@/features/algorithms/types";
import { track1Foundations } from "@/features/algorithms/constants/track1";

const track2Placeholder: AlgorithmTrack = {
  id: "intermediate-stl",
  name: "Intermediate STL",
  description: "Maps, sets, heaps, deques, and algorithm header utilities.",
  order: 2,
  chapters: [
    {
      id: "2-1",
      title: "std::map & std::set",
      topic: "Ordered containers, bounds, erase",
      estimatedMinutes: 22,
      snippets: [],
    },
  ],
};

const track3Placeholder: AlgorithmTrack = {
  id: "searching-sorting",
  name: "Searching & Sorting",
  description: "Binary search, two pointers, sliding window, prefix sums.",
  order: 3,
  chapters: [
    {
      id: "3-1",
      title: "Binary search — iterative",
      topic: "Classic lo/hi/mid pattern",
      estimatedMinutes: 18,
      snippets: [],
    },
  ],
};

const track4Placeholder: AlgorithmTrack = {
  id: "graphs-advanced",
  name: "Graphs & Advanced",
  description: "BFS, DFS, shortest paths, DSU, DP, segment trees.",
  order: 4,
  chapters: [
    {
      id: "4-1",
      title: "Graph representation",
      topic: "Adjacency list, matrix, edge list",
      estimatedMinutes: 18,
      snippets: [],
    },
  ],
};

export const algorithmTracks: AlgorithmTrack[] = [
  track1Foundations,
  track2Placeholder,
  track3Placeholder,
  track4Placeholder,
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
