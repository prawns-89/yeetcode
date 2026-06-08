"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useProgressStore } from "@/features/algorithms/store/progressStore";

export function ProgressHydrator() {
  const { status } = useSession();
  const hydrate = useProgressStore((s) => s.hydrate);

  useEffect(() => {
    if (status !== "authenticated") return;

    fetch("/api/progress")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) hydrate(data);
      })
      .catch(() => {});
  }, [status, hydrate]);

  return null;
}
