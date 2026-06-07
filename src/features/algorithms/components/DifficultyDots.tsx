import { cn } from "@/lib/cn";
import type { SnippetDifficulty } from "@/features/algorithms/types";

export function DifficultyDots({
  difficulty,
}: {
  difficulty: SnippetDifficulty;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3].map((level) => (
        <span
          key={level}
          className={cn(
            "h-2 w-2 rounded-full",
            level <= difficulty ? "bg-accent" : "bg-border",
          )}
        />
      ))}
    </div>
  );
}
