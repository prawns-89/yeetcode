"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { IslandSummary, TodayQuestState } from "@/features/islands/lib/daily-quest";
import type { Island } from "@/features/islands/constants/islands";
import { ISLANDS } from "@/features/islands/constants/islands";
import { IslandNode } from "@/features/islands/components/IslandNode";
import { IslandPanel } from "@/features/islands/components/IslandPanel";
import { CommandPalette } from "@/features/islands/components/CommandPalette";

interface Props {
  initialSummary: IslandSummary[];
  initialQuest: TodayQuestState | null;
}

export function IslandMapClient({ initialSummary, initialQuest }: Props) {
  const [summary, setSummary] = useState(initialSummary);
  const [quest, setQuest] = useState<TodayQuestState | null>(initialQuest);
  const [selectedIsland, setSelectedIsland] = useState<Island | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/islands");
    const data = await res.json() as { summary: IslandSummary[]; quest: TodayQuestState | null };
    setSummary(data.summary);
    setQuest(data.quest);
  }, []);

  const handleSelectIsland = useCallback((island: Island) => {
    setSelectedIsland(island);
    setIsPanelOpen(true);
  }, []);

  const handleClosePanel = useCallback(() => {
    setIsPanelOpen(false);
    setSelectedIsland(null);
  }, []);

  const handleChooseIsland = useCallback(async (category: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/islands", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ category }),
      });
      if (!res.ok) {
        const err = await res.json() as { error: string };
        alert(err.error);
        return;
      }
      await refresh();
    } finally {
      setLoading(false);
    }
  }, [refresh]);

  // Build a lookup for quick access
  const summaryMap = new Map(summary.map((s) => [s.island.id, s]));

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="islands-root">
      {/* ── Status bar ── */}
      <div className="islands-statusbar">
        <span className="islands-statusbar-item">archipelago</span>
        <span className="islands-statusbar-sep">|</span>
        {quest ? (
          <>
            <span className="islands-statusbar-item islands-statusbar-active">
              {quest.category.toUpperCase()}
            </span>
            <span className="islands-statusbar-sep">&nbsp;</span>
            <span className="islands-statusbar-item">
              {quest.completedCount}/5
            </span>
            {quest.islandProgress && (
              <>
                <span className="islands-statusbar-sep">|</span>
                <span className="islands-statusbar-item">
                  streak: {quest.islandProgress.currentStreak}
                </span>
              </>
            )}
          </>
        ) : (
          <span className="islands-statusbar-item islands-statusbar-idle">
            no island chosen — type <code>raid &lt;island&gt;</code>
          </span>
        )}
        <span className="islands-statusbar-sep islands-statusbar-date">{today}</span>
      </div>

      {/* ── Map canvas ── */}
      <div className="islands-canvas-wrap">
        <div className="islands-canvas">
          {/* SVG connection lines */}
          <svg className="islands-connections" aria-hidden="true">
            {/* Trees → Graphs */}
            <line x1="82%" y1="46%" x2="25%" y2="62%" />
            {/* Graphs → Advanced Graphs */}
            <line x1="25%" y1="62%" x2="12%" y2="50%" />
            {/* DFS/BFS: Trees → Advanced Graphs */}
            <line x1="82%" y1="46%" x2="12%" y2="50%" strokeDasharray="3 6" />
            {/* 1D DP → 2D DP */}
            <line x1="8%" y1="35%" x2="20%" y2="38%" />
            {/* Greedy → Intervals */}
            <line x1="35%" y1="44%" x2="50%" y2="40%" />
            {/* Arrays → Two Pointers */}
            <line x1="15%" y1="20%" x2="30%" y2="12%" />
            {/* Two Pointers → Sliding Window */}
            <line x1="30%" y1="12%" x2="45%" y2="8%" />
            {/* Stack → Binary Search */}
            <line x1="62%" y1="14%" x2="78%" y2="20%" />
            {/* Backtracking → Tries */}
            <line x1="55%" y1="64%" x2="40%" y2="70%" />
            {/* Heap → Graphs */}
            <line x1="70%" y1="56%" x2="25%" y2="62%" strokeDasharray="3 6" />
          </svg>

          {/* Island nodes */}
          {ISLANDS.map((island) => {
            const s = summaryMap.get(island.id);
            return (
              <IslandNode
                key={island.id}
                island={island}
                summary={s ?? null}
                quest={quest}
                onClick={() => handleSelectIsland(island)}
              />
            );
          })}
        </div>
      </div>

      {/* ── Side panel ── */}
      {isPanelOpen && selectedIsland && (
        <IslandPanel
          island={selectedIsland}
          summary={summaryMap.get(selectedIsland.id) ?? null}
          quest={quest}
          onClose={handleClosePanel}
          onChoose={handleChooseIsland}
          loading={loading}
        />
      )}

      {/* ── Command palette ── */}
      <CommandPalette
        quest={quest}
        onSelectIsland={handleSelectIsland}
        onChooseIsland={handleChooseIsland}
        onOpenPanel={(island) => { setSelectedIsland(island); setIsPanelOpen(true); }}
        loading={loading}
      />
    </div>
  );
}
