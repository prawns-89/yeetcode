import { TrackCard } from "@/components/algorithms/TrackCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { algorithmTracks } from "@/constants/curriculum";

export default function AlgorithmsPage() {
  return (
    <div>
      <PageHeader
        title="Algorithms"
        description="Build muscle memory for C++ syntax and competitive programming patterns."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {algorithmTracks.map((track, index) => (
          <TrackCard key={track.id} track={track} index={index} />
        ))}
      </div>
    </div>
  );
}
