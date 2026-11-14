import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL || process.env.DATABASE_URL_POOLED;

if (!connectionString) {
  console.error("❌ Error: DATABASE_URL is not defined in environment variables");
  process.exit(1);
}

const sql = neon(connectionString);

async function runMigration() {
  console.log("🚀 Running database migration on Neon PostgreSQL...");

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS recruitment_applications (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        branch VARCHAR(50) NOT NULL,
        email VARCHAR(120) NOT NULL UNIQUE,
        roll_number VARCHAR(50) NOT NULL UNIQUE,
        whatsapp_number VARCHAR(20) NOT NULL,
        calling_number VARCHAR(20),
        why_join TEXT,
        experience TEXT,
        other_societies TEXT,
        commitment TEXT,
        sub_teams TEXT[] NOT NULL,
        discovery_source VARCHAR(100) NOT NULL,
        portfolio_link TEXT,
        resume_link TEXT,
        campus_ideas TEXT,
        status VARCHAR(20) DEFAULT 'PENDING',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_recruitment_email ON recruitment_applications (email);
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_recruitment_roll ON recruitment_applications (roll_number);
    `;

    console.log("✅ Migration completed successfully! Table 'recruitment_applications' is ready.");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

runMigration();
