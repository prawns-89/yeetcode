"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { algorithmTracks } from "@/features/algorithms/constants/tracks";
import {
  getChapterProgress,
  isChapterUnlocked,
  isTrackUnlocked,
} from "@/features/algorithms/lib/unlock";
import { useCompletedSnippetSet, useProgressStore } from "@/features/algorithms/store/progressStore";
import type { AlgorithmTrack } from "@/features/algorithms/types";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/cn";

interface ChapterListProps {
  track: AlgorithmTrack;
}

export function ChapterList({ track }: ChapterListProps) {
  const completedSnippets = useCompletedSnippetSet();
  const snippetStats = useProgressStore((state) => state.snippetStats);
  const trackUnlocked = isTrackUnlocked(
    track,
    algorithmTracks,
    completedSnippets,
    snippetStats,
  );

  return (
    <div className="grid gap-4">
      {track.chapters.map((chapter, index) => {
        const chapterUnlocked =
          trackUnlocked && isChapterUnlocked(track, index, completedSnippets);
        const progress = getChapterProgress(track.id, chapter, completedSnippets);

        const content = (
          <Card
            hover={chapterUnlocked}
            className={cn(!chapterUnlocked && "opacity-60")}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-muted">
                  Chapter {index + 1}
                </p>
                <h3 className="mt-1 font-semibold text-foreground">
                  {chapter.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{chapter.topic}</p>
                {!trackUnlocked ? (
                  <p className="mt-2 text-xs text-warning">
                    Complete previous track at 70%+ accuracy to unlock
                  </p>
                ) : null}
              </div>
              <div className="text-right text-sm">
                {chapterUnlocked ? (
                  <>
                    <p className="text-muted">
                      {progress.completed}/{progress.total} done
                    </p>
                    <p className="text-muted">{chapter.estimatedMinutes} min</p>
                  </>
                ) : (
                  <Lock className="ml-auto h-4 w-4 text-muted" />
                )}
              </div>
            </div>
          </Card>
        );

        if (!chapterUnlocked) {
          return <div key={chapter.id}>{content}</div>;
        }

        return (
          <Link key={chapter.id} href={routes.algorithmChapter(track.id, chapter.id)}>
            {content}
          </Link>
        );
      })}
    </div>
  );
}
