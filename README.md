# CodeType

Gamified typing practice for competitive programmers. Build muscle memory for C++ STL syntax and LeetCode-style solutions.

## Features

- **Algorithms mode** — 4-track C++ curriculum (Foundations → Graphs & Advanced) with chapter unlocks
- **Questions mode** — 20 curated NeetCode-style problems with markdown descriptions
- **Typing engine** — Monkeytype-style canvas with WPM, accuracy, error highlighting
- **Progress tracking** — Sessions, personal bests, and curriculum progress in SQLite
- **Auth** — Dev login (no setup) or GitHub/Google OAuth

## Quick start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local — NEXTAUTH_SECRET is required

# Create database
npm run db:migrate

# Start dev server (port 3000)
npm run dev:clean
```

Open [http://localhost:3000/login](http://localhost:3000/login) and click **Continue as developer**.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run dev:clean` | Clear `.next` cache and start fresh |
| `npm run build` | Production build |
| `npm run db:migrate` | Apply Prisma migrations |
| `npm run db:push` | Push schema without migration |

## Project structure

```
src/
  app/              # Next.js routes
  features/
    algorithms/     # Curriculum, unlock logic, progress
    auth/           # NextAuth, dev login
    questions/      # Problem bank, filters
    sessions/       # Save/query typing sessions
    typing/         # Typing engine
  components/       # Shared UI shell
  lib/              # Prisma client, utilities
prisma/             # Schema + SQLite database
```

## Environment variables

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
DATABASE_URL="file:./prisma/dev.db"

# Optional OAuth
GITHUB_ID=
GITHUB_SECRET=
GOOGLE_ID=
GOOGLE_SECRET=
```

## Troubleshooting

**ChunkLoadError / Server error:** Multiple dev servers or stale cache. Stop all `next dev` processes, then run `npm run dev:clean`. Always use port 3000.

**Database errors:** Run `npm run db:migrate` to create `prisma/dev.db`.

## Tech stack

Next.js 14 · TypeScript · Tailwind CSS · Zustand · NextAuth · Prisma · SQLite
