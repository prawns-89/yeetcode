import "@/features/islands/styles/islands.css";
import { getAllIslandsSummary, getTodaysDailyQuest } from "@/features/islands/lib/daily-quest";
import { IslandMapClient } from "@/features/islands/components/IslandMapClient";

export const dynamic = "force-dynamic";

export default async function IslandsPage() {
  const [summary, quest] = await Promise.all([
    getAllIslandsSummary(),
    getTodaysDailyQuest(),
  ]);

  return <IslandMapClient initialSummary={summary} initialQuest={quest} />;
}
