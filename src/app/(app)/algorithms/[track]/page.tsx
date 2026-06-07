import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChapterList } from "@/features/algorithms/components/ChapterList";
import { getTrackById } from "@/features/algorithms/constants/tracks";

interface TrackPageProps {
  params: { track: string };
}

export default function TrackPage({ params }: TrackPageProps) {
  const track = getTrackById(params.track);

  if (!track) {
    notFound();
  }

  return (
    <div>
      <PageHeader title={track.name} description={track.description} />
      <ChapterList track={track} />
    </div>
  );
}
