import dotenv from "dotenv";
import { buildApp } from "./app.js";

dotenv.config();

const app = buildApp();
const port = Number(process.env.PORT) || 8081;
const host = process.env.HOST || "0.0.0.0";

const start = async () => {
  try {
    await app.listen({ port, host });
    console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🚀 EDC Recruitment Backend running successfully!   ║
║                                                       ║
║   Server:  http://${host}:${port}                     ║
║   Health:  http://${host}:${port}/health              ║
║   API:     http://${host}:${port}/api/recruitment     ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
    `);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

const gracefulShutdown = async (signal: string) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  await app.close();
  process.exit(0);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

start();
