"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { algorithmTracks } from "@/features/algorithms/constants/tracks";
import { isTrackUnlocked } from "@/features/algorithms/lib/unlock";
import { CHEAT_QUESTIONS } from "@/features/algorithms/lib/cheatQuestions";
import {
  useCompletedSnippetSet,
  useProgressStore,
} from "@/features/algorithms/store/progressStore";

type Phase = "idle" | "scanning" | "select" | "challenge" | "granted" | "denied";

function Scanlines() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10"
      style={{
        background:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,70,0.03) 2px, rgba(0,255,70,0.03) 4px)",
      }}
    />
  );
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CheatTerminal({ open, onClose }: Props) {
  const completedSnippets = useCompletedSnippetSet();
  const snippetStats = useProgressStore((s) => s.snippetStats);
  const bulkUnlockTrack = useProgressStore((s) => s.bulkUnlockTrack);

  const [phase, setPhase] = useState<Phase>("idle");
  const [log, setLog] = useState<string[]>([]);
  const [selectedTrackIdx, setSelectedTrackIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [shaking, setShaking] = useState(false);
  const [denied, setDenied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const lockedTracks = algorithmTracks.filter((t) => {
    const unlocked = isTrackUnlocked(t, algorithmTracks, completedSnippets, snippetStats);
    return !unlocked && !!CHEAT_QUESTIONS[t.id];
  });

  const push = useCallback((line: string) => setLog((l) => [...l, line]), []);

  // Boot sequence
  useEffect(() => {
    if (!open) {
      setPhase("idle");
      setLog([]);
      setAnswer("");
      setDenied(false);
      return;
    }
    setLog([]);
    setPhase("scanning");

    const lines = [
      "$ sudo ./yeet --exploit --bypass-acl",
      "",
      "  ██╗   ██╗███████╗███████╗████████╗",
      "  ╚██╗ ██╔╝██╔════╝██╔════╝╚══██╔══╝",
      "   ╚████╔╝ █████╗  █████╗     ██║   ",
      "    ╚██╔╝  ██╔══╝  ██╔══╝     ██║   ",
      "     ██║   ███████╗███████╗   ██║   ",
      "     ╚═╝   ╚══════╝╚══════╝   ╚═╝   ",
      "",
      "[*] YeetCode privilege escalation toolkit v0.1.0",
      "[*] Scanning curriculum access control table...",
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        setLog((l) => [...l, lines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setLog((l) => [
            ...l,
            "",
            `[*] Found ${lockedTracks.length} locked track(s) with exploitable surface.`,
            "",
            "[!] Select target:",
            "",
          ]);
          setPhase("select");
        }, 400);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [open, lockedTracks.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [log]);

  useEffect(() => {
    if (phase === "challenge") setTimeout(() => inputRef.current?.focus(), 100);
  }, [phase]);

  const handleSelectTrack = (idx: number) => {
    const track = lockedTracks[idx];
    if (!track) return;
    const q = CHEAT_QUESTIONS[track.id];
    setSelectedTrackIdx(idx);
    setAnswer("");
    setDenied(false);

    const modeTag = q.mode === "debug"
      ? "[MODE: DEBUG — spot the bug, submit the fix]"
      : "[MODE: RUN   — execute locally, submit stdout output]";

    setLog((l) => [
      ...l,
      `> target selected: ${track.name}`,
      "",
      `[*] Vulnerability: ${q.label}`,
      modeTag,
      "",
      "────────────────────────────────────────────────────────────",
      ...q.code.split("\n"),
      "────────────────────────────────────────────────────────────",
      "",
      `[?] ${q.prompt}`,
      "",
    ]);
    setPhase("challenge");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const track = lockedTracks[selectedTrackIdx];
    if (!track) return;
    const q = CHEAT_QUESTIONS[track.id];

    if (answer.trim() === q.answer) {
      // SUCCESS
      setPhase("granted");
      push(`> ${answer}`);
      push("");
      push("[*] Flag accepted. Validating...");
      push("[*] Overwriting lock state in memory...");
      setTimeout(() => {
        bulkUnlockTrack(track);
        push("");
        push("  ███████╗██╗   ██╗ ██████╗ ██████╗███████╗███████╗███████╗██╗");
        push("  ██╔════╝██║   ██║██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝██║");
        push("  ███████╗██║   ██║██║     ██║     █████╗  ███████╗███████╗██║");
        push("  ╚════██║██║   ██║██║     ██║     ██╔══╝  ╚════██║╚════██║╚═╝");
        push("  ███████║╚██████╔╝╚██████╗╚██████╗███████╗███████║███████║██╗");
        push("  ╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝╚══════╝╚══════╝╚══════╝╚═╝");
        push("");
        push(`[+] ${track.name} UNLOCKED. Access granted.`);
        push("[+] Evidence wiped. Session self-destructs in 3s.");
        setTimeout(() => onClose(), 3000);
      }, 600);
    } else {
      // FAIL
      setShaking(true);
      setDenied(true);
      push(`> ${answer}`);
      push("");
      push("[!] WRONG FLAG — INTRUSION DETECTED");
      push("[!] Countermeasures deployed. Try again.");
      push("");
      setAnswer("");
      setTimeout(() => { setShaking(false); setDenied(false); }, 800);
    }
  };

  if (!open) return null;

  return (
    <>
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
        @keyframes shake {
          0%, 100% { transform: translateX(0) }
          15% { transform: translateX(-10px) }
          35% { transform: translateX(10px) }
          55% { transform: translateX(-6px) }
          75% { transform: translateX(6px) }
        }
        @keyframes denied-flash {
          0%, 100% { box-shadow: 0 0 40px rgba(74,222,128,0.15), inset 0 0 40px rgba(0,0,0,0.8); border-color: rgba(74,222,128,0.4); }
          40% { box-shadow: 0 0 60px rgba(239,68,68,0.4), inset 0 0 40px rgba(239,68,68,0.05); border-color: rgba(239,68,68,0.7); }
        }
        .shake { animation: shake 0.5s ease; }
        .denied { animation: denied-flash 0.8s ease; }
        .terminal-glow { text-shadow: 0 0 8px rgba(74,222,128,0.6); }
        .code-line { color: #86efac; }
        .dim-line { color: rgba(74,222,128,0.45); }
      `}</style>

      <div
        className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div
          className={`relative w-full max-w-3xl h-[82vh] rounded-lg overflow-hidden border border-green-500/40 bg-black flex flex-col ${shaking ? "shake" : ""} ${denied ? "denied" : ""}`}
          style={{ boxShadow: "0 0 40px rgba(74,222,128,0.15), inset 0 0 40px rgba(0,0,0,0.8)" }}
        >
          <Scanlines />

          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-2 bg-green-950/40 border-b border-green-500/20 shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer hover:bg-red-500 transition-colors" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
            <div className="w-3 h-3 rounded-full bg-green-500/40" />
            <span className="ml-4 text-xs text-green-500/60 font-mono tracking-widest">
              yeet-exploit :: root@yeetcode
            </span>
            <span className="ml-auto text-xs text-green-500/30 font-mono">ESC to abort</span>
          </div>

          {/* Log */}
          <div className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-[1.6] text-green-400 terminal-glow">
            {log.map((line, i) => {
              const isCode = line && (line.startsWith("  ") || line.startsWith("─"));
              return (
                <div
                  key={i}
                  className={`whitespace-pre ${isCode ? "code-line" : ""}`}
                >
                  {line || "\u00a0"}
                </div>
              );
            })}

            {/* Track selection buttons */}
            {phase === "select" && lockedTracks.length > 0 && (
              <div className="mt-1 space-y-1">
                {lockedTracks.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTrack(i)}
                    className="block w-full text-left px-3 py-2 rounded border border-green-500/20 hover:bg-green-500/10 hover:border-green-400/40 transition-colors text-green-300 hover:text-green-200"
                  >
                    <span className="text-green-600 mr-2">[{i + 1}]</span>
                    {t.name}
                    <span className="ml-2 text-green-700">— {t.id}</span>
                  </button>
                ))}
              </div>
            )}

            {phase === "select" && lockedTracks.length === 0 && (
              <div className="text-yellow-400/70 mt-1">
                [*] No locked tracks found. Nothing to breach.
              </div>
            )}

            {/* Answer input */}
            {phase === "challenge" && (
              <form onSubmit={handleSubmit} className="mt-3 flex gap-2 items-center">
                <span className="text-green-600 shrink-0">flag&gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Escape") onClose(); }}
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  className="flex-1 bg-transparent border-none outline-none text-green-300 caret-green-400 placeholder-green-900 font-mono text-xs"
                  placeholder="submit your answer..."
                />
                <button
                  type="submit"
                  className="px-3 py-1 text-xs border border-green-500/40 rounded text-green-400 hover:bg-green-500/10 hover:border-green-400 transition-colors shrink-0"
                >
                  inject
                </button>
              </form>
            )}

            <div ref={bottomRef} />
          </div>
        </div>
      </div>
    </>
  );
}
