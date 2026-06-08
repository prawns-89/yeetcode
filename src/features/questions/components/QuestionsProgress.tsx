"use client";

import { useEffect, useState } from "react";
import { problems } from "@/features/questions/data/problems_client";

export function QuestionsProgress() {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    fetch("/api/progress")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data?.completedSnippets) return;
        const count = (data.completedSnippets as string[]).filter((id: string) =>
          id.startsWith("questions/"),
        ).length;
        setCompleted(count);
      })
      .catch(() => {});
  }, []);

  return (
    <span>
      {completed}/{problems.length} completed
    </span>
  );
}
