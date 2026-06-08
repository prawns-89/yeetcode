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
