import { prisma } from "@/lib/prisma";

interface UpsertUserInput {
  email: string;
  username: string;
  avatarUrl?: string | null;
}

export async function upsertUser(input: UpsertUserInput) {
  return prisma.user.upsert({
    where: { email: input.email },
    create: {
      email: input.email,
      username: input.username,
      avatarUrl: input.avatarUrl ?? null,
    },
    update: {
      username: input.username,
      avatarUrl: input.avatarUrl ?? undefined,
    },
  });
}

export async function getUserById(userId: string) {
  return prisma.user.findUnique({ where: { id: userId } });
}
