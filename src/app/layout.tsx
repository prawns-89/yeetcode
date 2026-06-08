import type { Metadata } from "next";
import { ProgressHydrator } from "@/features/algorithms/components/ProgressHydrator";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeType — Algorithm typing practice",
  description:
    "Typing practice for competitive programmers. Build muscle memory for C++ STL and LeetCode solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ProgressHydrator />
        {children}
      </body>
    </html>
  );
}
