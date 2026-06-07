import type { NextAuthOptions } from "next-auth";
import { routes } from "@/lib/routes";
import { buildAuthProviders, getAuthSecret } from "@/features/auth/lib/providers";

export const authOptions: NextAuthOptions = {
  secret: getAuthSecret(),
  providers: buildAuthProviders(),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: routes.login,
    error: routes.login,
  },
  callbacks: {
    async jwt({ token, profile, user }) {
      if (profile && "login" in profile && typeof profile.login === "string") {
        token.username = profile.login;
      } else if (user?.name) {
        token.username = user.name;
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
