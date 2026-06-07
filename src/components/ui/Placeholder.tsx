import { cn } from "@/lib/cn";

interface PlaceholderProps {
  title: string;
  description?: string;
  className?: string;
}

export function Placeholder({ title, description, className }: PlaceholderProps) {
  return (
    <div
      className={cn(
        "flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface/50 p-8 text-center",
        className,
      )}
    >
      <p className="text-sm font-medium text-foreground">{title}</p>
      {description ? (
        <p className="mt-2 max-w-md text-sm text-muted">{description}</p>
      ) : null}
    </div>
  );
}
