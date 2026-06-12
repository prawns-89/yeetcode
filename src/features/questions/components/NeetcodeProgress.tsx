"use client";

import { useEffect, useState } from "react";
import neetcode150List from "../data/neetcode_150.json";

export function NeetcodeProgress() {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    fetch("/api/progress")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data?.completedSnippets) return;
        const completedSlugs = new Set(
          (data.completedSnippets as string[]).map((id) => id.replace("questions/", ""))
        );
        const count = neetcode150List.filter((item) => completedSlugs.has(item.slug)).length;
        setCompleted(count);
      })
      .catch(() => {});
  }, []);

  return (
    <span>
      {completed}/150 completed
    </span>
  );
}
