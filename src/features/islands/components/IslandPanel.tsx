"use client";

import type { Island } from "@/features/islands/constants/islands";
import type { IslandSummary, TodayQuestState } from "@/features/islands/lib/daily-quest";
import { routes } from "@/lib/routes";

interface Props {
  island: Island;
  summary: IslandSummary | null;
  quest: TodayQuestState | null;
  onClose: () => void;
  onChoose: (category: string) => void;
  loading: boolean;
}

const FAMILY_CLASS: Record<string, string> = {
  blue:   "island-panel--blue",
  amber:  "island-panel--amber",
  green:  "island-panel--green",
  violet: "island-panel--violet",
  slate:  "island-panel--slate",
};

export function IslandPanel({ island, summary, quest, onClose, onChoose, loading }: Props) {
  const familyClass = FAMILY_CLASS[island.colorFamily] ?? "island-panel--slate";
  const isActiveIsland = quest?.category === island.category;
  const isOtherIslandChosen = quest && !isActiveIsland;
  const progress = summary?.islandProgress;

  const today = new Date().toISOString().slice(0, 10);
  const tomorrow = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  })();

  return (
    <div className={`island-panel ${familyClass}`} role="dialog" aria-label={island.label}>
      {/* Header */}
      <div className="island-panel-header">
        <div>
          <p className="island-panel-category">island</p>
          <h2 className="island-panel-title">{island.label}</h2>
          {progress && (
            <p className="island-panel-meta">
              cleared: {progress.totalClears}&nbsp;&nbsp;
              streak: {progress.currentStreak}&nbsp;&nbsp;
              last: {progress.lastClearedDate ?? "—"}
            </p>
          )}
        </div>
        <button className="island-panel-close" onClick={onClose} aria-label="Close">
          &#x2715;
        </button>
      </div>

      {/* Quest section */}
      <div className="island-panel-section">
        {isActiveIsland && quest ? (
          <>
            <p className="island-panel-section-label">today&apos;s raid — {today}</p>
            <ol className="island-panel-problems">
              {quest.problems.map((qp) => (
                <li
                  key={qp.questId}
                  className={`island-panel-problem ${qp.completed ? "island-panel-problem--done" : ""}`}
                >
                  <span className="island-panel-problem-num">
                    {String(qp.position).padStart(2, "0")}
                  </span>
                  <span className="island-panel-problem-title">{qp.title}</span>
                  <span className={`island-panel-problem-diff island-panel-problem-diff--${qp.difficulty}`}>
                    {qp.difficulty}
                  </span>
                  <span className="island-panel-problem-status">
                    {qp.completed ? (
                      <span className="island-panel-checkmark">&#x2713;</span>
                    ) : (
                      <a
                        href={`${routes.question(qp.slug)}?questId=${qp.questId}`}
                        className="island-panel-type-link"
                      >
                        [ type ]
                      </a>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </>
        ) : isOtherIslandChosen ? (
          <div className="island-panel-locked">
            <p className="island-panel-locked-label">locked</p>
            <p className="island-panel-locked-msg">
              today&apos;s island is already set to{" "}
              <strong>{quest?.category}</strong>.
            </p>
            <p className="island-panel-locked-until">
              available: {tomorrow} 00:00
            </p>
          </div>
        ) : (
          <div className="island-panel-choose">
            <p className="island-panel-section-label">no island chosen today</p>
            <p className="island-panel-choose-sub">
              5 problems will be selected from a shared pattern within{" "}
              <strong>{island.label}</strong>.
            </p>
            <button
              className="island-panel-raid-btn"
              onClick={() => onChoose(island.category)}
              disabled={loading}
            >
              {loading ? "setting up..." : "[ raid this island ]"}
            </button>
          </div>
        )}
      </div>

      {/* References */}
      <div className="island-panel-section">
        <p className="island-panel-section-label">references</p>
        <ul className="island-panel-refs">
          {island.cppRefs.map((ref) => (
            <li key={ref.url}>
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="island-panel-ref-link"
              >
                {ref.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={island.neetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="island-panel-ref-link"
            >
              neetcode roadmap &#x2197;
            </a>
          </li>
        </ul>
      </div>

      {/* Sub-patterns */}
      <div className="island-panel-section">
        <p className="island-panel-section-label">patterns</p>
        <ul className="island-panel-patterns">
          {island.subPatterns.map((p) => (
            <li key={p} className="island-panel-pattern">{p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
