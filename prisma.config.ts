// prisma.config.ts
// Prisma v7 configuration file — connection URL lives here, NOT in schema.prisma
// SDD Ref: docs/SDD.md — Section 1.4 (ORM: Prisma ORM with MongoDB connector)

import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
