import { defineConfig } from "@prisma/config";
import { config } from "dotenv";
import path from "path";

// Load environment variables
config({ path: path.resolve(process.cwd(), '.env') });

// Main database configuration
export const mainDbConfig = {
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
};

// Submission database configuration
export const submissionDbConfig = {
  schema: "prisma/submission.prisma",
  migrations: {
    path: "prisma/migrations/submission",
  },
  datasource: {
    url: process.env.NEON_DATABASE_URL,
  },
};

// Export default configuration (main database)
export default defineConfig(mainDbConfig);
