import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { AppMode } from "@/types";

interface ModeCardProps {
  mode: AppMode;
  title: string;
  description: string;
  progress: React.ReactNode;
  href: string;
}

export function ModeCard({
  mode,
  title,
  description,
  progress,
  href,
}: ModeCardProps) {
  return (
    <Link href={href}>
      <Card hover className="h-full">
        <div className="flex h-full flex-col">
          <p className="text-xs font-medium uppercase tracking-wider text-accent">
            {mode}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-foreground">{title}</h3>
          <p className="mt-2 flex-1 text-sm text-muted">{description}</p>
          <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            <span className="text-sm text-muted">{progress}</span>
            <ArrowRight className="h-4 w-4 text-accent" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
