import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL as string },
} satisfies Config;
