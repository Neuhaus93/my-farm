import dotenv from "dotenv";
import type { Config } from "drizzle-kit";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), "../..", ".env"),
});

export default {
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL as string },
} satisfies Config;
