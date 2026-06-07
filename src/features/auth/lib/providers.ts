import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export function getAuthSecret(): string {
  const secret = process.env.NEXTAUTH_SECRET;
  if (secret) return secret;

  if (process.env.NODE_ENV === "development") {
    return "codetype-dev-secret-replace-in-production";
  }

  throw new Error(
    "NEXTAUTH_SECRET is required. Copy .env.example to .env.local and set a secret.",
  );
}

export function buildAuthProviders(): NextAuthOptions["providers"] {
  const providers: NextAuthOptions["providers"] = [];

  if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
    providers.push(
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    );
  }

  if (process.env.GOOGLE_ID && process.env.GOOGLE_SECRET) {
    providers.push(
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
    );
  }

  if (process.env.NODE_ENV === "development") {
    providers.push(
      CredentialsProvider({
        id: "dev",
        name: "Dev login",
        credentials: {
          username: { label: "Username", type: "text" },
        },
        async authorize(credentials) {
          const name = credentials?.username?.trim() || "developer";
          return {
            id: "dev-user",
            name,
            email: `${name}@localhost`,
          };
        },
      }),
    );
  }

  return providers;
}
