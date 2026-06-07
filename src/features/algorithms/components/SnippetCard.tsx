import { Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { DifficultyDots } from "@/features/algorithms/components/DifficultyDots";
import type { AlgorithmSnippet } from "@/features/algorithms/types";
import { cn } from "@/lib/cn";

interface SnippetCardProps {
  snippet: AlgorithmSnippet;
  completed: boolean;
  selected: boolean;
  onSelect: () => void;
}

export function SnippetCard({
  snippet,
  completed,
  selected,
  onSelect,
}: SnippetCardProps) {
  return (
    <button type="button" onClick={onSelect} className="w-full text-left">
      <Card
        hover
        className={cn(
          selected && "border-accent bg-accent/5",
          completed && "border-success/40",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-medium text-foreground">{snippet.title}</p>
            <div className="mt-2">
              <DifficultyDots difficulty={snippet.difficulty} />
            </div>
          </div>
          {completed ? (
            <Check className="h-4 w-4 shrink-0 text-success" />
          ) : null}
        </div>
      </Card>
    </button>
  );
}
