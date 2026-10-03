"use client";

import { useEffect, useRef, useState } from "react";

const CHEAT_SEQUENCE = "yeet";

/**
 * Listens globally for the user typing "yeet" (case-insensitive) anywhere on
 * the page (not inside text inputs, to avoid accidents) and fires the callback.
 */
export function useCheatCode(onActivate: () => void) {
  const bufferRef = useRef<string>("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't intercept when the user is typing in an input / textarea / contenteditable
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      const isEditable =
        tag === "input" ||
        tag === "textarea" ||
        (e.target as HTMLElement)?.isContentEditable;
      if (isEditable) return;

      // Only care about printable single characters
      if (e.key.length !== 1) {
        bufferRef.current = "";
        return;
      }

      bufferRef.current += e.key.toLowerCase();

      // Keep only the last N chars (length of the sequence)
      if (bufferRef.current.length > CHEAT_SEQUENCE.length) {
        bufferRef.current = bufferRef.current.slice(-CHEAT_SEQUENCE.length);
      }

      // Reset buffer after 2s of inactivity
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => { bufferRef.current = ""; }, 2000);

      if (bufferRef.current === CHEAT_SEQUENCE) {
        bufferRef.current = "";
        onActivate();
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onActivate]);
}
