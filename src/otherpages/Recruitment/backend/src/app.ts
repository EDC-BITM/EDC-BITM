import fastify from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import { healthRoutes } from "./routes/health.js";
import { recruitmentRoutes } from "./routes/recruitment.js";

export function buildApp() {
  const app = fastify({
    logger: {
      level: process.env.LOG_LEVEL || "info",
    },
  });

  // 1. Centrally configured CORS
  const allowedOrigins = [
    process.env.CORS_ORIGIN,
    process.env.FRONTEND_URL,
    "https://edcbitmesra.in",
    "https://www.edcbitmesra.in",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:5174",
  ].filter(Boolean) as string[];

  app.register(cors, {
    origin: (origin, cb) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin) {
        return cb(null, true);
      }

      const isAllowed = allowedOrigins.some((allowed) => {
        if (allowed === origin) return true;
        // Support Vercel preview deployments if origin matches *.vercel.app
        if (origin.endsWith(".vercel.app") && origin.includes("edc")) return true;
        return false;
      });

      if (isAllowed) {
        cb(null, true);
      } else {
        app.log.warn({ origin, allowedOrigins }, "CORS rejected origin");
        cb(new Error("Not allowed by CORS"), false);
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  // 2. Basic Rate Limiting (Prevents flood and spam)
  app.register(rateLimit, {
    max: 60, // max 60 requests per window
    timeWindow: "1 minute",
    errorResponseBuilder: () => ({
      success: false,
      message: "Too many requests. Please slow down and try again shortly.",
    }),
  });

  // 3. Register Routes
  app.get("/", async () => {
    return {
      status: "ok",
      name: "EDC BIT Mesra Recruitment Backend",
      version: "1.0.0",
      healthCheck: "/health",
      api: "/api/recruitment",
    };
  });

  app.register(healthRoutes);
  app.register(recruitmentRoutes);

  // 4. Default 404 Handler
  app.setNotFoundHandler((request, reply) => {
    reply.status(404).send({
      success: false,
      message: "Route not found",
      path: request.url,
    });
  });

  // 5. Global Error Handler
  app.setErrorHandler((error: any, _request, reply) => {
    app.log.error(error);
    const statusCode = error.statusCode || 500;
    return reply.status(statusCode).send({
      success: false,
      message: error.message || "Internal server error",
    });
  });

  return app;
}
