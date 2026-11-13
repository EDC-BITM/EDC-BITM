import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const connectionString =
  process.env.DATABASE_URL || process.env.DATABASE_URL_POOLED || "";

export const sql: NeonQueryFunction<false, false> = neon(connectionString);

/**
 * Health check querying Neon PostgreSQL using `SELECT 1`
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  if (!connectionString) {
    return false;
  }
  try {
    const result = await sql`SELECT 1 as connected;`;
    return Array.isArray(result) && result.length > 0;
  } catch (error) {
    console.error("Database connection failure:", error);
    return false;
  }
}
