-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PersonalBest" (
    "userId" TEXT NOT NULL,
    "snippetId" TEXT NOT NULL,
    "snippetTitle" TEXT NOT NULL DEFAULT '',
    "bestNetWpm" INTEGER NOT NULL,
    "bestAccuracy" INTEGER NOT NULL,
    "achievedAt" DATETIME NOT NULL,
    "sessionId" TEXT,

    PRIMARY KEY ("userId", "snippetId"),
    CONSTRAINT "PersonalBest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PersonalBest" ("achievedAt", "bestAccuracy", "bestNetWpm", "sessionId", "snippetId", "userId") SELECT "achievedAt", "bestAccuracy", "bestNetWpm", "sessionId", "snippetId", "userId" FROM "PersonalBest";
DROP TABLE "PersonalBest";
ALTER TABLE "new_PersonalBest" RENAME TO "PersonalBest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
