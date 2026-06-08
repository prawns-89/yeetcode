"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DifficultyBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Problem } from "@/features/questions/types";
import { cn } from "@/lib/cn";

const tabs = ["Description", "Approach"] as const;

interface ProblemPanelProps {
  problem: Problem;
}

export function ProblemPanel({ problem }: ProblemPanelProps) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Description");

  return (
    <Card className="h-full overflow-y-auto">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted">#{problem.number}</span>
        <DifficultyBadge difficulty={problem.difficulty} />
        <span className="rounded-md border border-border px-2 py-0.5 text-xs uppercase text-muted">
          {problem.source}
        </span>
      </div>

      <h2 className="mt-4 text-xl font-semibold text-foreground">
        {problem.title}
      </h2>

      <div className="mt-6 flex gap-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "border-b-2 px-3 py-2 text-sm transition-colors",
              activeTab === tab
                ? "border-accent text-foreground"
                : "border-transparent text-muted hover:text-foreground",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="prose prose-invert mt-6 max-w-none text-sm">
        {activeTab === "Description" ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {problem.description}
          </ReactMarkdown>
        ) : (
          <div className="space-y-4 text-muted">
            <p>{problem.approach}</p>
            <div className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-surface-elevated p-4 text-sm">
              <div>
                <p className="text-xs uppercase text-muted">Time</p>
                <p className="font-mono text-foreground">{problem.timeComplexity}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-muted">Space</p>
                <p className="font-mono text-foreground">{problem.spaceComplexity}</p>
              </div>
            </div>
            <p>
              <span className="text-foreground">Topics:</span>{" "}
              {problem.topics.join(", ")}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
