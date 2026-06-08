-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "preferredMode" TEXT NOT NULL DEFAULT 'algorithms',
    "onboardingComplete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "TypingSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "snippetId" TEXT NOT NULL,
    "snippetTitle" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "netWpm" INTEGER NOT NULL,
    "rawWpm" INTEGER NOT NULL,
    "accuracy" INTEGER NOT NULL,
    "secondsTaken" INTEGER NOT NULL,
    "errors" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT true,
    "attemptedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TypingSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PersonalBest" (
    "userId" TEXT NOT NULL,
    "snippetId" TEXT NOT NULL,
    "bestNetWpm" INTEGER NOT NULL,
    "bestAccuracy" INTEGER NOT NULL,
    "achievedAt" DATETIME NOT NULL,
    "sessionId" TEXT,

    PRIMARY KEY ("userId", "snippetId"),
    CONSTRAINT "PersonalBest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CurriculumProgress" (
    "userId" TEXT NOT NULL,
    "snippetId" TEXT NOT NULL,
    "firstCompletedAt" DATETIME NOT NULL,
    "attemptCount" INTEGER NOT NULL DEFAULT 1,
    "lastNetWpm" INTEGER NOT NULL,
    "lastAccuracy" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "snippetId"),
    CONSTRAINT "CurriculumProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "TypingSession_userId_attemptedAt_idx" ON "TypingSession"("userId", "attemptedAt" DESC);
