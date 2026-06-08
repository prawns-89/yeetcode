"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-xl font-semibold text-foreground">
        Something went wrong
      </h2>
      <p className="max-w-md text-sm text-muted">
        Try refreshing the page. If the error persists, run{" "}
        <code className="rounded bg-surface px-1">npm run dev:clean</code> to
        clear the build cache.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
