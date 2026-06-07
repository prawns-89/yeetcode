import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Chapter } from "@/types";
import { routes } from "@/lib/routes";

interface ChapterCardProps {
  trackId: string;
  chapter: Chapter;
  index: number;
}

export function ChapterCard({ trackId, chapter, index }: ChapterCardProps) {
  return (
    <Link href={routes.algorithmChapter(trackId, chapter.id)}>
      <Card hover>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-muted">Chapter {index + 1}</p>
            <h3 className="mt-1 font-semibold text-foreground">
              {chapter.title}
            </h3>
            <p className="mt-1 text-sm text-muted">{chapter.topic}</p>
          </div>
          <div className="text-right text-sm text-muted">
            <p>{chapter.snippetCount} snippets</p>
            <p>{chapter.estimatedMinutes} min</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
