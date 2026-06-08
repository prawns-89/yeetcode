import { AppNav } from "./AppNav";
import { OnboardingGuard } from "@/features/auth/components/OnboardingGuard";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <OnboardingGuard />
      <AppNav />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
