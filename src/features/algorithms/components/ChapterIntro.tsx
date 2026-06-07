import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { AlgorithmChapter, AlgorithmTrack } from "@/features/algorithms/types";

interface ChapterIntroProps {
  track: AlgorithmTrack;
  chapter: AlgorithmChapter;
  chapterIndex: number;
  unlocked: boolean;
  onStart: () => void;
}

export function ChapterIntro({
  track,
  chapter,
  chapterIndex,
  unlocked,
  onStart,
}: ChapterIntroProps) {
  return (
    <Card>
      <p className="text-xs font-medium uppercase tracking-wider text-muted">
        {track.name} · Chapter {chapterIndex + 1}
      </p>
      <h2 className="mt-2 text-xl font-semibold text-foreground">
        {chapter.title}
      </h2>
      <p className="mt-2 text-sm text-muted">{chapter.topic}</p>
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
        <span>{chapter.snippets.length} snippets</span>
        <span>~{chapter.estimatedMinutes} min</span>
        <span>{unlocked ? "Unlocked" : "Locked"}</span>
      </div>
      <Button className="mt-6" onClick={onStart} disabled={!unlocked}>
        {unlocked ? "Start chapter" : "Complete previous chapter first"}
      </Button>
    </Card>
  );
}
