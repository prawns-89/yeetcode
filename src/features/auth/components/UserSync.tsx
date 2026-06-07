"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/stores/userStore";

export function UserSync() {
  const { data: session } = useSession();
  const setUsername = useUserStore((state) => state.setUsername);

  useEffect(() => {
    if (session?.user?.name) {
      setUsername(session.user.name);
    }
  }, [session?.user?.name, setUsername]);

  return null;
}
