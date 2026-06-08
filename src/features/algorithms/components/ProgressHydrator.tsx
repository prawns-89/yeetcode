"use client";

import { useEffect } from "react";
import { useProgressStore } from "@/features/algorithms/store/progressStore";

export function ProgressHydrator() {
  const hydrate = useProgressStore((s) => s.hydrate);

  useEffect(() => {
    fetch("/api/progress")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) hydrate(data);
      })
      .catch(() => {});
  }, [hydrate]);

  return null;
}
