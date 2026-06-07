import { notFound } from "next/navigation";
import { ChapterCard } from "@/components/algorithms/ChapterCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { algorithmTracks } from "@/constants/curriculum";

interface TrackPageProps {
  params: { track: string };
}

export default function TrackPage({ params }: TrackPageProps) {
  const track = algorithmTracks.find((item) => item.id === params.track);

  if (!track) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title={track.name}
        description={track.description}
      />

      <div className="grid gap-4">
        {track.chapters.map((chapter, index) => (
          <ChapterCard
            key={chapter.id}
            trackId={track.id}
            chapter={chapter}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
