import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { AppMode } from "@/types";

interface UserState {
  username: string;
  preferredMode: AppMode;
  onboardingComplete: boolean;
  setUsername: (username: string) => void;
  setPreferredMode: (mode: AppMode) => void;
  completeOnboarding: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      username: "guest",
      preferredMode: "algorithms",
      onboardingComplete: false,
      setUsername: (username) => set({ username }),
      setPreferredMode: (mode) => set({ preferredMode: mode }),
      completeOnboarding: () => set({ onboardingComplete: true }),
    }),
    { name: "user-store" },
  ),
);
