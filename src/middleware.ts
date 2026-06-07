import { withAuth } from "next-auth/middleware";
import { routes } from "@/lib/routes";

export default withAuth({
  pages: {
    signIn: routes.login,
  },
});

export const config = {
  matcher: [
    "/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
