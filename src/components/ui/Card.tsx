import { cn } from "@/lib/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface p-5",
        hover && "transition-colors hover:border-border-strong hover:bg-surface-elevated",
        className,
      )}
    >
      {children}
    </div>
  );
}
