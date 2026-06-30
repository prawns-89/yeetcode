"use client";

import { useState, useCallback } from "react";
import { AppNav } from "./AppNav";
import { CheatTerminal } from "@/features/algorithms/components/CheatTerminal";
import { useCheatCode } from "@/features/algorithms/hooks/useCheatCode";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const activate = useCallback(() => setTerminalOpen(true), []);
  useCheatCode(activate);

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
      <CheatTerminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </div>
  );
}
