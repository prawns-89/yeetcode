"use client";

import { useCallback, useEffect, useState } from "react";
import {
  createTypingSession,
  handleTypingBackspace,
  handleTypingKey,
  resetTypingSession,
  tickTypingSession,
  toSessionResult,
} from "@/features/typing/lib/engine";
import type {
  TypingSessionResult,
  TypingSessionState,
} from "@/features/typing/types";

export function useTypingSession(source: string) {
  const [session, setSession] = useState<TypingSessionState>(() =>
    createTypingSession(source),
  );
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setSession(createTypingSession(source));
    setShowResult(false);
  }, [source]);

  useEffect(() => {
    if (!session.startedAt || session.isComplete) {
      return;
    }

    const interval = window.setInterval(() => {
      setSession((current) => tickTypingSession(current));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [session.startedAt, session.isComplete]);

  useEffect(() => {
    if (session.isComplete) {
      setShowResult(true);
    }
  }, [session.isComplete]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "r") {
        event.preventDefault();
        setSession(resetTypingSession(source));
        setShowResult(false);
        return;
      }

      if (event.key === "Backspace") {
        event.preventDefault();
        setSession((current) => handleTypingBackspace(current));
        return;
      }

      if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        setSession((current) => handleTypingKey(current, event.key));
      }
    },
    [source],
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const reset = useCallback(() => {
    setSession(resetTypingSession(source));
    setShowResult(false);
  }, [source]);

  const dismissResult = useCallback(() => {
    setShowResult(false);
  }, []);

  const result: TypingSessionResult = toSessionResult(session);

  return {
    session,
    result,
    showResult,
    reset,
    dismissResult,
  };
}
