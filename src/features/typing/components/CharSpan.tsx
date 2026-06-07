import type { CharStatus } from "@/features/typing/types";
import { cn } from "@/lib/cn";

interface CharSpanProps {
  char: string;
  status: CharStatus;
  isCaret: boolean;
}

export function CharSpan({ char, status, isCaret }: CharSpanProps) {
  const display = char === "\n" ? "\n" : char === "\t" ? "    " : char;

  return (
    <span
      className={cn(
        "relative whitespace-pre-wrap break-words",
        status === "pending" && "text-muted/50",
        status === "correct" && "text-foreground",
        status === "incorrect" && "rounded-sm bg-danger/20 text-danger",
        isCaret &&
          "after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:animate-pulse after:bg-accent",
      )}
    >
      {display}
    </span>
  );
}
