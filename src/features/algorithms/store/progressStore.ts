"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { snippetKey } from "@/features/algorithms/lib/keys";
import type { SnippetAttempt } from "@/features/algorithms/types";

interface ProgressState {
  completedSnippets: string[];
  snippetStats: Record<string, SnippetAttempt>;
  hydrated: boolean;
  recordAttempt: (
    trackId: string,
    chapterId: string,
    snippetId: string,
    attempt: Omit<SnippetAttempt, "completedAt">,
  ) => void;
  isSnippetComplete: (
    trackId: string,
    chapterId: string,
    snippetId: string,
  ) => boolean;
  hydrate: (data: {
    completedSnippets: string[];
    snippetStats: Record<string, SnippetAttempt>;
  }) => void;
  /** Cheat code: marks every snippet in a track as 100% complete. */
  bulkUnlockTrack: (track: import("@/features/algorithms/types").AlgorithmTrack) => void;
}

export const useProgressStore = create<ProgressState>()(
  devtools(
    persist(
      (set, get) => ({
        completedSnippets: [],
        snippetStats: {},
        hydrated: false,
        recordAttempt: (trackId, chapterId, snippetId, attempt) => {
          const key = snippetKey(trackId, chapterId, snippetId);
          set((state) => ({
            completedSnippets: state.completedSnippets.includes(key)
              ? state.completedSnippets
              : [...state.completedSnippets, key],
            snippetStats: {
              ...state.snippetStats,
              [key]: {
                ...attempt,
                completedAt: new Date().toISOString(),
              },
            },
          }));
        },
        isSnippetComplete: (trackId, chapterId, snippetId) => {
          const key = snippetKey(trackId, chapterId, snippetId);
          return get().completedSnippets.includes(key);
        },
        hydrate: (data) => {
          set({
            completedSnippets: data.completedSnippets,
            snippetStats: data.snippetStats,
            hydrated: true,
          });
        },
        bulkUnlockTrack: (track) => {
          const newKeys: string[] = [];
          const newStats: Record<string, SnippetAttempt> = {};
          for (const chapter of track.chapters) {
            for (const snippet of chapter.snippets) {
              const key = snippetKey(track.id, chapter.id, snippet.id);
              newKeys.push(key);
              newStats[key] = { completedAt: new Date().toISOString(), netWpm: 120, accuracy: 100 };
            }
          }
          set((state) => ({
            completedSnippets: Array.from(new Set([...state.completedSnippets, ...newKeys])),
            snippetStats: { ...state.snippetStats, ...newStats },
          }));
        },
      }),
      { name: "codetype-algorithm-progress" },
    ),
    { name: "progress-store" },
  ),
);

export function useCompletedSnippetSet(): Set<string> {
  const completed = useProgressStore((state) => state.completedSnippets);
  return new Set(completed);
}
