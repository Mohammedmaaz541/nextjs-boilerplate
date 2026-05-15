/**
 * lib/prisma.ts
 * Prisma Client singleton for Next.js App Router (Prisma v7 + MongoDB).
 *
 * In development, Next.js hot-reloads modules frequently. Without this
 * singleton pattern each reload creates a new PrismaClient, exhausting
 * the MongoDB Atlas connection pool.
 *
 * Prisma v7 (MongoDB): No driver adapter required — MongoDB uses Prisma's
 * built-in native connector. The DATABASE_URL is read at runtime from the
 * environment (set in .env via dotenv or Vercel env vars).
 *
 * SDD Ref: docs/SDD.md — Section 2.3 (lib/prisma.ts)
 */

import { PrismaClient } from "@/app/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
