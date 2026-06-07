import { computeMetrics } from "@/features/typing/lib/metrics";
import type {
  CharStatus,
  TypingSessionResult,
  TypingSessionState,
} from "@/features/typing/types";

export function createTypingSession(source: string): TypingSessionState {
  return {
    source,
    cursor: 0,
    statuses: Array.from({ length: source.length }, () => "pending" as CharStatus),
    errors: 0,
    startedAt: null,
    finishedAt: null,
    isComplete: false,
    metrics: computeMetrics({
      typedChars: 0,
      errors: 0,
      totalChars: source.length,
      elapsedMs: 0,
    }),
  };
}

function refreshMetrics(state: TypingSessionState): TypingSessionState {
  const elapsedMs =
    state.startedAt === null
      ? 0
      : (state.finishedAt ?? Date.now()) - state.startedAt;

  return {
    ...state,
    metrics: computeMetrics({
      typedChars: state.cursor,
      errors: state.errors,
      totalChars: state.source.length,
      elapsedMs,
    }),
  };
}

export function handleTypingKey(
  state: TypingSessionState,
  key: string,
): TypingSessionState {
  if (state.isComplete || key.length !== 1) {
    return state;
  }

  const startedAt = state.startedAt ?? Date.now();
  const expected = state.source[state.cursor];
  const isCorrect = key === expected;
  const statuses = [...state.statuses];
  statuses[state.cursor] = isCorrect ? "correct" : "incorrect";

  const cursor = state.cursor + 1;
  const errors = state.errors + (isCorrect ? 0 : 1);
  const isComplete = cursor >= state.source.length;
  const finishedAt = isComplete ? Date.now() : state.finishedAt;

  return refreshMetrics({
    ...state,
    statuses,
    cursor,
    errors,
    startedAt,
    finishedAt,
    isComplete,
  });
}

export function handleTypingBackspace(
  state: TypingSessionState,
): TypingSessionState {
  if (state.isComplete || state.cursor === 0) {
    return state;
  }

  const index = state.cursor - 1;
  const statuses = [...state.statuses];
  const wasIncorrect = statuses[index] === "incorrect";
  statuses[index] = "pending";

  return refreshMetrics({
    ...state,
    statuses,
    cursor: index,
    errors: wasIncorrect ? state.errors - 1 : state.errors,
    finishedAt: null,
    isComplete: false,
  });
}

export function resetTypingSession(source: string): TypingSessionState {
  return createTypingSession(source);
}

export function tickTypingSession(state: TypingSessionState): TypingSessionState {
  if (!state.startedAt || state.isComplete) {
    return state;
  }
  return refreshMetrics(state);
}

export function toSessionResult(state: TypingSessionState): TypingSessionResult {
  const elapsedMs =
    state.startedAt === null
      ? 0
      : (state.finishedAt ?? Date.now()) - state.startedAt;

  return {
    ...state.metrics,
    completed: state.isComplete,
    secondsTaken: Math.max(Math.round(elapsedMs / 1000), 0),
  };
}
