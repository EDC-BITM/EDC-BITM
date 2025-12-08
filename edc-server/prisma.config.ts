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


export default defineConfig(mainDbConfig);
