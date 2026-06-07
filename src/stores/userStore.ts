import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { AppMode, League } from "@/types";

interface UserState {
  username: string;
  xp: number;
  league: League;
  streak: number;
  preferredMode: AppMode;
  onboardingComplete: boolean;
  setPreferredMode: (mode: AppMode) => void;
  completeOnboarding: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      username: "coder",
      xp: 0,
      league: "bronze",
      streak: 0,
      preferredMode: "algorithms",
      onboardingComplete: false,
      setPreferredMode: (mode) => set({ preferredMode: mode }),
      completeOnboarding: () => set({ onboardingComplete: true }),
    }),
    { name: "user-store" },
  ),
);
