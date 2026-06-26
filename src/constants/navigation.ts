import type { NavItem } from "@/types";
import { routes } from "@/lib/routes";

export const mainNav: NavItem[] = [
  { label: "Dashboard", href: routes.dashboard, icon: "layout-dashboard" },
  { label: "Practice", href: routes.select, icon: "keyboard" },
  { label: "Questions", href: routes.questions, icon: "list" },
  { label: "Islands", href: routes.islands, icon: "map" },
  { label: "Profile", href: routes.profile, icon: "user" },
];
