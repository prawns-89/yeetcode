import { ModeCard } from "@/components/dashboard/ModeCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { getTotalSnippetCount } from "@/features/algorithms/constants/tracks";
import { problems } from "@/features/questions/data/problems_client";
import { routes } from "@/lib/routes";

export default function SelectModePage() {
  return (
    <div>
      <PageHeader
        title="Choose a mode"
        description="Pick Algorithms for structured curriculum or Questions for problem-bank practice."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <ModeCard
          mode="algorithms"
          title="Algorithms"
          description="Linear C++ STL tracks with chapter unlocks and snippet carousels."
          progress={`4 tracks · ${getTotalSnippetCount()} snippets`}
          href={routes.algorithms}
        />
        <ModeCard
          mode="questions"
          title="Questions"
          description="LeetCode-style problem list with split-panel typing sessions."
          progress={`${problems.length} problems`}
          href={routes.questions}
        />
      </div>
    </div>
  );
}
