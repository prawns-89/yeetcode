import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { routes } from "@/lib/routes";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: routes.login,
  },
  callbacks: {
    async jwt({ token, profile }) {
      if (profile && "login" in profile && typeof profile.login === "string") {
        token.username = profile.login;
      } else if (profile?.name) {
        token.username = profile.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name =
          (token.username as string | undefined) ?? session.user.name ?? "User";
      }
      return session;
    },
  },
};
