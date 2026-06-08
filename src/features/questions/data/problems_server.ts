import "server-only";
import detailsData from "./problems_details.json";
import type { Problem } from "@/features/questions/types";

export function getProblemBySlug(slug: string): Problem | undefined {
  return (detailsData as Record<string, Problem>)[slug];
}
