import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { TypingCanvas } from "@/features/typing/components/TypingCanvas";
import { Card } from "@/components/ui/Card";
import { VECTOR_BASICS_SNIPPET, algorithmTracks } from "@/constants/curriculum";

interface ChapterPageProps {
  params: { track: string; chapter: string };
}

export default function ChapterPage({ params }: ChapterPageProps) {
  const track = algorithmTracks.find((item) => item.id === params.track);
  const chapter = track?.chapters.find((item) => item.id === params.chapter);

  if (!track || !chapter) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title={chapter.title}
        description={`${track.name} · ${chapter.topic} · ${chapter.snippetCount} snippets`}
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: Math.min(chapter.snippetCount, 4) }).map((_, i) => (
          <Card key={i} hover>
            <p className="text-sm font-medium text-foreground">Snippet {i + 1}</p>
            <p className="mt-1 text-xs text-muted">Click to practice — wired in M3</p>
          </Card>
        ))}
      </div>

      <TypingCanvas code={VECTOR_BASICS_SNIPPET} />
    </div>
  );
}
