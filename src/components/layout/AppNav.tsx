"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Keyboard, LayoutDashboard, List, User } from "lucide-react";
import { mainNav } from "@/constants/navigation";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { useUserStore } from "@/stores/userStore";

const iconMap = {
  "layout-dashboard": LayoutDashboard,
  keyboard: Keyboard,
  list: List,
  user: User,
} as const;

export function AppNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const username = useUserStore((s) => s.username);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const displayUsername = mounted ? username : "local_user";
  const initials = displayUsername.slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link href={routes.dashboard} className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20 text-sm font-bold text-accent">
              CT
            </span>
            <span className="hidden font-semibold text-foreground sm:inline">
              CodeType
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {mainNav.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              const isActive =
                item.href === routes.dashboard
                  ? pathname === routes.dashboard
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-surface-elevated text-foreground"
                      : "text-muted hover:bg-surface-hover hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <span className="hidden text-muted sm:inline">{displayUsername}</span>
          <Link
            href={routes.profile}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-elevated text-xs font-medium text-foreground"
          >
            {initials}
          </Link>
        </div>
      </div>
    </header>
  );
}
