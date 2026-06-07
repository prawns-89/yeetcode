import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Track } from "@/types";
import { routes } from "@/lib/routes";

interface TrackCardProps {
  track: Track;
  index: number;
}

export function TrackCard({ track, index }: TrackCardProps) {
  return (
    <Link href={routes.algorithmTrack(track.id)}>
      <Card hover>
        <p className="text-xs font-medium uppercase tracking-wider text-muted">
          Track {index + 1}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-foreground">
          {track.name}
        </h3>
        <p className="mt-2 text-sm text-muted">{track.description}</p>
        <p className="mt-4 text-sm text-accent">
          {track.chapters.length} chapters
        </p>
      </Card>
    </Link>
  );
}
