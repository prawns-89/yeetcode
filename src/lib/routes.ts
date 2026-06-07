export const routes = {
  login: "/login",
  onboarding: "/onboarding",
  dashboard: "/",
  select: "/select",
  algorithms: "/algorithms",
  algorithmTrack: (track: string) => `/algorithms/${track}`,
  algorithmChapter: (track: string, chapter: string) =>
    `/algorithms/${track}/${chapter}`,
  questions: "/questions",
  question: (slug: string) => `/questions/${slug}`,
  profile: "/profile",
  leaderboard: "/leaderboard",
} as const;
