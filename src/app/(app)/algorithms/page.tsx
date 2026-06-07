import { PageHeader } from "@/components/layout/PageHeader";
import { algorithmTracks } from "@/features/algorithms/constants/tracks";
import { TrackCard } from "@/features/algorithms/components/TrackCard";

export default function AlgorithmsPage() {
  return (
    <div>
      <PageHeader
        title="Algorithms"
        description="Build muscle memory for C++ syntax and competitive programming patterns."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {algorithmTracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}
