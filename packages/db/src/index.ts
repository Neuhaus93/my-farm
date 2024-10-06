import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import path from "path";
import pg from "pg";
import * as schema from "./schema";

dotenv.config({
  path: path.resolve(process.cwd(), "../..", ".env"),
});

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
export const db = drizzle(pool, { schema });
export * from "./schema";
