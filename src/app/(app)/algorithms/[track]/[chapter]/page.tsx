import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChapterSession } from "@/features/algorithms/components/ChapterSession";
import { getChapter } from "@/features/algorithms/constants/tracks";

interface ChapterPageProps {
  params: { track: string; chapter: string };
}

export default function ChapterPage({ params }: ChapterPageProps) {
  const result = getChapter(params.track, params.chapter);

  if (!result) {
    notFound();
  }

  const { track, chapter } = result;
  const chapterIndex = track.chapters.findIndex((item) => item.id === chapter.id);

  return (
    <div>
      <PageHeader
        title={chapter.title}
        description={`${track.name} · ${chapter.topic}`}
      />
      <ChapterSession
        track={track}
        chapter={chapter}
        chapterIndex={chapterIndex}
      />
    </div>
  );
}
