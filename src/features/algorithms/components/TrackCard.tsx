"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { algorithmTracks } from "@/features/algorithms/constants/tracks";
import { isTrackUnlocked } from "@/features/algorithms/lib/unlock";
import { useCompletedSnippetSet, useProgressStore } from "@/features/algorithms/store/progressStore";
import type { AlgorithmTrack } from "@/features/algorithms/types";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/cn";

interface TrackCardProps {
  track: AlgorithmTrack;
}

export function TrackCard({ track }: TrackCardProps) {
  const completedSnippets = useCompletedSnippetSet();
  const snippetStats = useProgressStore((state) => state.snippetStats);
  const unlocked = isTrackUnlocked(
    track,
    algorithmTracks,
    completedSnippets,
    snippetStats,
  );

  const snippetCount = track.chapters.reduce(
    (sum, chapter) => sum + chapter.snippets.length,
    0,
  );

  const card = (
    <Card hover={unlocked} className={cn(!unlocked && "opacity-60")}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Track {track.order}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-foreground">
            {track.name}
          </h3>
          <p className="mt-2 text-sm text-muted">{track.description}</p>
          <p className="mt-4 text-sm text-accent">
            {track.chapters.length} chapters · {snippetCount} snippets
          </p>
          {!unlocked ? (
            <p className="mt-2 text-xs text-warning">
              Finish previous track at 70%+ accuracy
            </p>
          ) : null}
        </div>
        {!unlocked ? <Lock className="h-4 w-4 shrink-0 text-muted" /> : null}
      </div>
    </Card>
  );

  if (!unlocked) return card;

  return <Link href={routes.algorithmTrack(track.id)}>{card}</Link>;
}
