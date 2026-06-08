import type { SaveSessionInput } from "@/features/sessions/types";

export function validateSessionInput(body: unknown): SaveSessionInput | null {
  if (!body || typeof body !== "object") return null;

  const data = body as Record<string, unknown>;
  const mode = data.mode;
  if (mode !== "algorithms" && mode !== "questions") return null;

  const snippetId = data.snippetId;
  const snippetTitle = data.snippetTitle;
  if (typeof snippetId !== "string" || snippetId.length === 0) return null;
  if (typeof snippetTitle !== "string" || snippetTitle.length === 0) return null;

  const netWpm = Number(data.netWpm);
  const rawWpm = Number(data.rawWpm);
  const accuracy = Number(data.accuracy);
  const secondsTaken = Number(data.secondsTaken);
  const errors = Number(data.errors ?? 0);

  if (
    !Number.isFinite(netWpm) ||
    !Number.isFinite(rawWpm) ||
    !Number.isFinite(accuracy) ||
    !Number.isFinite(secondsTaken) ||
    !Number.isFinite(errors)
  ) {
    return null;
  }

  if (
    netWpm < 0 ||
    netWpm > 500 ||
    rawWpm < 0 ||
    rawWpm > 500 ||
    accuracy < 0 ||
    accuracy > 100 ||
    secondsTaken < 1 ||
    secondsTaken > 3600 ||
    errors < 0
  ) {
    return null;
  }

  return {
    snippetId,
    snippetTitle,
    mode,
    netWpm: Math.round(netWpm),
    rawWpm: Math.round(rawWpm),
    accuracy: Math.round(accuracy),
    secondsTaken: Math.round(secondsTaken),
    errors: Math.round(errors),
    completed: data.completed !== false,
  };
}
