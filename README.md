# CodeType

Gamified typing practice for competitive programmers. Build muscle memory for C++ STL syntax and over 3,400 LeetCode-style verified solutions.

**Note:** This application is designed to be a **local-first, single-user** desktop experience. Your data is yours, stored locally, and there is no authentication or external server tracking.

## Features

- **Local-First Architecture** — No accounts, no cloud sync, your data stays entirely on your local machine using an integrated SQLite database.
- **Algorithms mode** — 4-track C++ curriculum (Foundations → Graphs & Advanced) with chapter unlocks.
- **Questions mode** — Over 3,400 curated NeetCode-style problems with markdown descriptions and verified C++ solutions parsed from `doocs/leetcode`.
- **Typing engine** — Monkeytype-style canvas with WPM, accuracy, and error highlighting.
- **Progress tracking** — Sessions, personal bests, and curriculum progress tracked natively.

## Quick start

To start training, simply clone the repository and run the app locally:

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/codetype.git
cd codetype

# 2. Install dependencies
npm install

# 3. Create your local database
npx prisma db push

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You will immediately be dropped into the dashboard.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run dev:clean` | Clear `.next` cache and start fresh |
| `npm run build` | Production build |
| `npx prisma db push` | Push the Prisma schema to the SQLite DB |
| `npx prisma studio` | View your raw typing stats in Prisma Studio |

## Project structure

```
src/
  app/              # Next.js routes
  features/
    algorithms/     # Curriculum, unlock logic, progress
    questions/      # Problem bank, filters, 3400+ parsed JSON problems
    sessions/       # Save/query typing sessions to local DB
    typing/         # Custom typing engine
  components/       # Shared UI shell
  lib/              # Prisma client, utilities
  stores/           # Zustand client state (Persisted in localStorage)
prisma/             # Schema + SQLite database (dev.db)
```

## Tech stack

Next.js 14 · TypeScript · Tailwind CSS · Zustand · Prisma · SQLite
