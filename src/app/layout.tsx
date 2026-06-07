import type { Metadata } from "next";
import localFont from "next/font/local";
import { SessionProvider } from "@/features/auth/components/SessionProvider";
import { UserSync } from "@/features/auth/components/UserSync";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <SessionProvider>
          <UserSync />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
