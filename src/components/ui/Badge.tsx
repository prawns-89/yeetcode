import { cn } from "@/lib/cn";
import type { Difficulty } from "@/types";

const difficultyStyles: Record<Difficulty, string> = {
  easy: "bg-success/15 text-success border-success/30",
  medium: "bg-warning/15 text-warning border-warning/30",
  hard: "bg-danger/15 text-danger border-danger/30",
};

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium uppercase tracking-wide",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <Badge className={difficultyStyles[difficulty]}>{difficulty}</Badge>
  );
}
