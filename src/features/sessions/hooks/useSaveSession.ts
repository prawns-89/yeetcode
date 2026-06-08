"use client";

import { useCallback } from "react";
import type { TypingSessionResult } from "@/features/typing/types";
import type { SaveSessionInput } from "@/features/sessions/types";

export function useSaveSession() {
  const saveSession = useCallback(async (input: SaveSessionInput) => {
    try {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        console.error("Failed to save session", await response.text());
        return null;
      }

      return response.json() as Promise<{ isPersonalBest: boolean }>;
    } catch (error) {
      console.error("Failed to save session", error);
      return null;
    }
  }, []);

  const saveFromTypingResult = useCallback(
    async (
      result: TypingSessionResult,
      meta: Omit<SaveSessionInput, keyof TypingSessionResult | "errors" | "completed"> & {
        errors?: number;
      },
    ) => {
      if (!result.completed) return null;

      return saveSession({
        ...meta,
        netWpm: result.netWpm,
        rawWpm: result.rawWpm,
        accuracy: result.accuracy,
        secondsTaken: result.secondsTaken,
        errors: meta.errors ?? result.errors,
        completed: true,
      });
    },
    [saveSession],
  );

  return { saveSession, saveFromTypingResult };
}
