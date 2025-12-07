import fastify from "fastify";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { z } from "zod";
import authRoutes from "./routes/auth/index.js";
import articleRoutes from "./routes/article/index.js";
import { submissionRoutes } from "./routes/submission/routes.js";
// Load environment variables
dotenv.config();

const server = fastify({
	logger:
		process.env.NODE_ENV === "development"
			? {
					level: process.env.LOG_LEVEL || "info",
					transport: {
						target: "pino-pretty",
						options: {
							translateTime: "HH:MM:ss Z",
							ignore: "pid,hostname",
						},
					},
				}
			: {
					level: process.env.LOG_LEVEL || "info",
				},
	bodyLimit: 30 * 1024 * 1024, // 30MB limit
});

// Register plugins
await server.register(cors, {
	origin: process.env.NODE_ENV === "production" 
		? (origin, cb) => {
			// In production, allow specific origins from env or common deployment platforms
			const allowedOrigins = [
				process.env.CORS_ORIGIN,
				process.env.FRONTEND_URL,
				"https://edcbitmesra.in",
			].filter(Boolean);
			
			server.log.info({ origin, allowedOrigins }, "CORS origin check");
			
			if (!origin || allowedOrigins.includes(origin)) {
				cb(null, true);
			} else {
				server.log.warn({ origin, allowedOrigins }, "CORS rejected origin");
				cb(new Error("Not allowed by CORS"), false);
			}
		}
		: [
			"http://localhost:3000",
			"http://localhost:5173",
			"http://localhost:5174",
			process.env.CORS_ORIGIN || "http://localhost:5173",
		],
	credentials: true,
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
	exposedHeaders: ["Set-Cookie"],
});

await server.register(cookie, {
	secret: process.env.COOKIE_SECRET || "your-cookie-secret-key",
	parseOptions: {},
});

// Debug middleware to log cookies on each request
server.addHook("onRequest", async (request, reply) => {
	const cookies = request.headers.cookie;
	if (request.url.includes("/api/")) {
		server.log.info({
			url: request.url,
			method: request.method,
			origin: request.headers.origin,
			hasCookies: !!cookies,
			cookieHeader: cookies ? "present" : "missing",
		}, "Request debug info");
	}
});

// Health check routes
server.get("/", async () => {
	return {
		status: "ok",
		message: "EDC Server API",
		version: "1.0.0",
		timestamp: new Date().toISOString(),
	};
});

server.get("/health", async () => {
	return {
		status: "healthy",
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
	};
});

server.get("/ping", async () => {
	return "pong\n";
});

// Register routes
await server.register(authRoutes, { prefix: "/api/auth" });
await server.register(articleRoutes, { prefix: "/api/articles" });
await server.register(submissionRoutes, { prefix: "/api/submissions" });

// Global error handler
server.setErrorHandler((error, request, reply) => {
	server.log.error(error);

	// Handle Zod validation errors
	if (error instanceof z.ZodError) {
		return reply.status(400).send({
			success: false,
			message: "Validation failed",
			errors: error.issues.map((issue) => ({
				field: issue.path.join('.'),
				message: issue.message,
				code: issue.code,
			})),
		});
	}

	// Handle Prisma errors
	if (typeof error === "object" && error !== null && "message" in error && typeof (error as any).message === "string") {
		if ((error as any).message.includes("Unique constraint")) {
			return reply.status(409).send({
				success: false,
				message: "A record with this information already exists",
			});
		}

		if ((error as any).message.includes("Record to update not found")) {
			return reply.status(404).send({
				success: false,
				message: "Record not found",
			});
		}
	}

	// Handle validation errors
	if (typeof error === "object" && error !== null && "validation" in error) {
		return reply.status(400).send({
			success: false,
			message: "Validation error",
			errors: (error as any).validation,
		});
	}

	// Default error response
	const statusCode = typeof error === "object" && error !== null && "statusCode" in error && typeof (error as any).statusCode === "number"
		? (error as any).statusCode
		: 500;
	const message = typeof error === "object" && error !== null && "message" in error && typeof (error as any).message === "string"
		? (error as any).message
		: "Internal server error";
	return reply.status(statusCode).send({
		success: false,
		message,
	});
});

// 404 handler
server.setNotFoundHandler((request, reply) => {
	return reply.status(404).send({
		success: false,
		message: "Route not found",
		path: request.url,
	});
});

// Start server
const start = async () => {
	try {
		const port = Number(process.env.PORT) || 8080;
		const host = process.env.HOST || "0.0.0.0";

		await server.listen({ port, host });

		console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║       🚀 EDC Server is running successfully! 🚀       ║
║                                                       ║
║   Server:  http://${host}:${port}                     ║
║   Health:  http://${host}:${port}/health              ║
║   API:     http://${host}:${port}/api                 ║
║                                                       ║
║   Environment: ${process.env.NODE_ENV || "development"}                           
║                                                       ║
╚═══════════════════════════════════════════════════════╝
		`);
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};

// Handle graceful shutdown
const gracefulShutdown = async (signal: string) => {
	console.log(`\n${signal} received. Shutting down gracefully...`);
	await server.close();
	console.log("Server closed successfully");
	process.exit(0);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

start();
