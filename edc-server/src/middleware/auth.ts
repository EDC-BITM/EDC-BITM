import type { FastifyRequest, FastifyReply } from "fastify";
import { verifyAccessToken } from "../utils/jwt.js";

export interface AuthenticatedRequest extends FastifyRequest {
	user?: {
		userId: string;
		email: string;
		role: string;
	};
}

export async function authenticate(
	request: AuthenticatedRequest,
	reply: FastifyReply,
): Promise<void> {
	try {
		// Helper to get cookie value
		const getCookieValue = (name: string) => {
			const header = request.headers?.cookie;
			if (!header) return undefined;
			const parts = header.split(";").map((p: string) => p.trim());
			for (const part of parts) {
				const [k, v] = part.split("=");
				if (k === name) return decodeURIComponent(v || "");
			}
			return undefined;
		};

		// Try to get token from cookie first, fallback to Authorization header
		let token = getCookieValue("accessToken");
		
		// Detailed logging for debugging
		const cookieHeader = request.headers?.cookie;
		const hasRefreshToken = !!getCookieValue("refreshToken");
		
		request.log?.info({
			url: request.url,
			method: request.method,
			hasCookieHeader: !!cookieHeader,
			hasAccessToken: !!token,
			hasRefreshToken: hasRefreshToken,
			cookieLength: cookieHeader?.length || 0,
			// Log first 50 chars of cookie for debugging (don't log full tokens in production)
			cookiePreview: cookieHeader ? cookieHeader.substring(0, 50) + "..." : "none",
		}, "Auth middleware - detailed check");
		
		if (!token) {
			const authHeader = request.headers.authorization;
			if (authHeader && authHeader.startsWith("Bearer ")) {
				token = authHeader.substring(7);
				request.log?.info("Using Authorization header token");
			}
		}

		if (!token) {
			request.log?.warn({
				hasCookieHeader: !!cookieHeader,
				hasAuthHeader: !!request.headers.authorization,
			}, "No token provided - authentication failed");
			return reply.status(401).send({
				success: false,
				message: "No token provided",
			});
		}

		const payload = await verifyAccessToken(token);
		request.log?.info({ userId: payload.userId, role: payload.role }, "Token verified successfully");

		request.user = payload;
	} catch (error) {
		request.log?.error({ 
			error: error instanceof Error ? error.message : String(error),
			url: request.url,
		}, "Token verification failed");
		return reply.status(401).send({
			success: false,
			message: "Invalid or expired token",
		});
	}
}

export async function requireRole(...allowedRoles: string[]) {
	return async (
		request: AuthenticatedRequest,
		reply: FastifyReply,
	): Promise<void> => {
		if (!request.user) {
			return reply.status(401).send({
				success: false,
				message: "Authentication required",
			});
		}

		if (!allowedRoles.includes(request.user.role)) {
			return reply.status(403).send({
				success: false,
				message: "Insufficient permissions",
			});
		}
	};
}
