"use client";

import type { Island } from "@/features/islands/constants/islands";
import type { IslandSummary, TodayQuestState } from "@/features/islands/lib/daily-quest";

interface Props {
  island: Island;
  summary: IslandSummary | null;
  quest: TodayQuestState | null;
  onClick: () => void;
}

const FAMILY_CLASS: Record<string, string> = {
  blue: "island-node--blue",
  amber: "island-node--amber",
  green: "island-node--green",
  violet: "island-node--violet",
  slate: "island-node--slate",
};

export function IslandNode({ island, summary, quest, onClick }: Props) {
  const isActive = quest?.category === island.category;
  const isCleared = isActive && (quest?.isCleared ?? false);
  const todayProgress = isActive ? (quest?.completedCount ?? 0) : 0;
  const neverVisited = !summary || (summary.islandProgress.totalCompleted === 0 && !isActive);
  const totalClears = summary?.islandProgress.totalClears ?? 0;

  const familyClass = FAMILY_CLASS[island.colorFamily] ?? "island-node--slate";

  return (
    <button
      className={[
        "island-node",
        familyClass,
        isActive && "island-node--active",
        isCleared && "island-node--cleared",
        neverVisited && "island-node--unvisited",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ left: `${island.x}%`, top: `${island.y}%` }}
      onClick={onClick}
      title={island.label}
    >
      {/* Active indicator */}
      {isActive && !isCleared && (
        <span className="island-node-cursor" aria-hidden="true">&gt;</span>
      )}
      {isCleared && (
        <span className="island-node-cleared-mark" aria-hidden="true">&#x2713;</span>
      )}

      <span className="island-node-label">{island.label}</span>

      {/* Stats row */}
      <span className="island-node-stats">
        {isActive ? (
          <span className="island-node-progress">{todayProgress}/5</span>
        ) : (
          totalClears > 0 && (
            <span className="island-node-clears">x{totalClears}</span>
          )
        )}
      </span>
    </button>
  );
}
