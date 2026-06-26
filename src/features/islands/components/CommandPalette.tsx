"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { Island } from "@/features/islands/constants/islands";
import { ISLANDS } from "@/features/islands/constants/islands";
import type { TodayQuestState } from "@/features/islands/lib/daily-quest";

interface Props {
  quest: TodayQuestState | null;
  onSelectIsland: (island: Island) => void;
  onChooseIsland: (category: string) => void;
  onOpenPanel: (island: Island) => void;
  loading: boolean;
}

// Map user-friendly shortcuts to island ids
const ISLAND_ALIASES: Record<string, string> = {
  arrays:       "arrays-hashing",
  hashing:      "arrays-hashing",
  "two pointers": "two-pointers",
  pointers:     "two-pointers",
  "sliding window": "sliding-window",
  sliding:      "sliding-window",
  window:       "sliding-window",
  stack:        "stack",
  "binary search": "binary-search",
  binary:       "binary-search",
  search:       "binary-search",
  "linked list": "linked-list",
  linked:       "linked-list",
  list:         "linked-list",
  trees:        "trees",
  tree:         "trees",
  heap:         "heap-priority-queue",
  pq:           "heap-priority-queue",
  "priority queue": "heap-priority-queue",
  backtracking: "backtracking",
  tries:        "tries",
  trie:         "tries",
  graphs:       "graphs",
  graph:        "graphs",
  "advanced graphs": "advanced-graphs",
  advanced:     "advanced-graphs",
  "1d dp":      "1d-dp",
  "1-d dp":     "1d-dp",
  dp1:          "1d-dp",
  "2d dp":      "2d-dp",
  "2-d dp":     "2d-dp",
  dp2:          "2d-dp",
  dp:           "1d-dp",
  greedy:       "greedy",
  intervals:    "intervals",
  math:         "math-geometry",
  geometry:     "math-geometry",
  "math geometry": "math-geometry",
  "bit manipulation": "bit-manipulation",
  bits:         "bit-manipulation",
  bit:          "bit-manipulation",
};

type CommandOutput =
  | { type: "text"; lines: string[] }
  | { type: "island-list"; islands: Island[] }
  | { type: "error"; msg: string };

export function CommandPalette({ quest, onSelectIsland, onChooseIsland, onOpenPanel, loading }: Props) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<CommandOutput | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const resolveIsland = (name: string): Island | null => {
    const key = name.toLowerCase().trim();
    const id = ALIAS_MAP.get(key);
    if (id) return ISLANDS.find((i) => i.id === id) ?? null;
    // fuzzy: starts with
    return ISLANDS.find((i) =>
      i.label.toLowerCase().startsWith(key) ||
      i.id.startsWith(key)
    ) ?? null;
  };

  const ALIAS_MAP = new Map(
    Object.entries(ISLAND_ALIASES).map(([k, v]) => [k, v])
  );

  const runCommand = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setHistory((h) => [trimmed, ...h.slice(0, 49)]);
    setHistoryIdx(-1);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");

    if (cmd === "raid" || cmd === "r") {
      if (!args) {
        setOutput({ type: "island-list", islands: ISLANDS });
        return;
      }
      const island = resolveIsland(args);
      if (!island) {
        setOutput({ type: "error", msg: `unknown island: "${args}" — try "raid" to list all` });
        return;
      }
      if (quest) {
        setOutput({
          type: "text",
          lines: [
            `island already set to: ${quest.category}`,
            `locked until tomorrow 00:00`,
          ],
        });
        return;
      }
      onOpenPanel(island);
      setOutput(null);
      return;
    }

    if (cmd === "ls" || cmd === "islands") {
      setOutput({ type: "island-list", islands: ISLANDS });
      return;
    }

    if (cmd === "status" || cmd === "s") {
      if (!quest) {
        setOutput({ type: "text", lines: ["no island chosen today", 'use "raid <island>" to begin'] });
      } else {
        setOutput({
          type: "text",
          lines: [
            `island:   ${quest.category}`,
            `progress: ${quest.completedCount}/5`,
            `date:     ${quest.date}`,
            ...(quest.islandProgress
              ? [
                  `streak:   ${quest.islandProgress.currentStreak}`,
                  `clears:   ${quest.islandProgress.totalClears}`,
                ]
              : []),
          ],
        });
      }
      return;
    }

    if (cmd === "open" || cmd === "o") {
      const island = resolveIsland(args);
      if (!island) {
        setOutput({ type: "error", msg: `unknown island: "${args}"` });
        return;
      }
      onOpenPanel(island);
      setOutput(null);
      return;
    }

    if (cmd === "help" || cmd === "h" || cmd === "?") {
      setOutput({
        type: "text",
        lines: [
          "commands:",
          "  raid [island]   — choose today's island (or list all)",
          "  open [island]   — open island panel without raiding",
          "  status          — show today's progress",
          "  ls              — list all islands",
          "  help            — show this",
          "",
          "island shortcuts: trees, graphs, dp, bits, arrays, ...",
        ],
      });
      return;
    }

    // Unknown — try treating whole input as island name
    const island = resolveIsland(trimmed);
    if (island) {
      onOpenPanel(island);
      setOutput(null);
      return;
    }

    setOutput({ type: "error", msg: `unknown command: "${cmd}" — type "help"` });
  }, [quest, onOpenPanel, onChooseIsland]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
      setSuggestions([]);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(next);
      setInput(history[next] ?? "");
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? "" : history[next] ?? "");
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length === 1) {
        const [cmd, ...rest] = input.trim().split(/\s+/);
        setInput(`${cmd} ${suggestions[0]} `);
        setSuggestions([]);
      }
    }

    if (e.key === "Escape") {
      setOutput(null);
      setSuggestions([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);

    // Autocomplete island names after raid/open
    const parts = val.split(/\s+/);
    if ((parts[0] === "raid" || parts[0] === "open" || parts[0] === "r" || parts[0] === "o") && parts.length >= 2) {
      const partial = parts.slice(1).join(" ").toLowerCase();
      if (partial.length > 0) {
        const matches = ISLANDS
          .filter((i) => i.label.toLowerCase().includes(partial) || i.id.includes(partial))
          .map((i) => i.label.toLowerCase().replace(/[^a-z ]/g, ""));
        setSuggestions(matches.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Click outside to clear output
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!inputRef.current?.closest(".command-palette")?.contains(e.target as Node)) {
        setOutput(null);
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="command-palette">
      {/* Output / suggestions above the input */}
      {output && (
        <div className="command-output">
          {output.type === "text" && output.lines.map((l, i) => (
            <p key={i} className="command-output-line">{l || "\u00a0"}</p>
          ))}
          {output.type === "island-list" && (
            <ul className="command-island-list">
              {output.islands.map((island) => (
                <li key={island.id}>
                  <button
                    className="command-island-item"
                    onClick={() => {
                      onOpenPanel(island);
                      setOutput(null);
                    }}
                  >
                    <span className={`command-island-dot command-island-dot--${island.colorFamily}`} />
                    {island.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {output.type === "error" && (
            <p className="command-output-error">{output.msg}</p>
          )}
        </div>
      )}

      {suggestions.length > 0 && (
        <ul className="command-suggestions">
          {suggestions.map((s) => (
            <li key={s} className="command-suggestion">
              {s}
            </li>
          ))}
        </ul>
      )}

      {/* Input row */}
      <div className="command-input-row">
        <span className="command-prompt">&gt;</span>
        <input
          ref={inputRef}
          className="command-input"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={'raid <island> | ls | status | help'}
          spellCheck={false}
          autoComplete="off"
          autoFocus
        />
        {loading && <span className="command-loading">...</span>}
      </div>
    </div>
  );
}
