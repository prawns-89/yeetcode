"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { routes } from "@/lib/routes";

export function OnboardingGuard() {
  const { status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") return;
    if (pathname === routes.onboarding) return;

    fetch("/api/user")
      .then((res) => (res.ok ? res.json() : null))
      .then((user) => {
        if (user && !user.onboardingComplete) {
          router.replace(routes.onboarding);
        }
      })
      .catch(() => {});
  }, [status, pathname, router]);

  return null;
}
