"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { useUserStore } from "@/stores/userStore";

export function ProfileHeader() {
  const [mounted, setMounted] = useState(false);
  const username = useUserStore((s) => s.username);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const displayUsername = mounted ? username : "local_user";
  const initials = displayUsername.slice(0, 2).toUpperCase();

  return (
    <Card className="lg:col-span-1">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-elevated text-lg font-semibold">
        {initials}
      </div>
      <h2 className="mt-4 text-xl font-semibold">{displayUsername}</h2>
      <p className="text-sm text-muted">Local Database</p>
    </Card>
  );
}
