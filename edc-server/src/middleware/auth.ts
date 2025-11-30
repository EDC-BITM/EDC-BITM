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
		
		// Log cookie presence for debugging
		request.log?.info({
			hasCookie: !!request.headers.cookie,
			hasAccessToken: !!token,
			cookieHeader: request.headers.cookie ? "present" : "missing",
		}, "Auth middleware - cookie check");
		
		if (!token) {
			const authHeader = request.headers.authorization;
			if (authHeader && authHeader.startsWith("Bearer ")) {
				token = authHeader.substring(7);
			}
		}

		if (!token) {
			request.log?.warn("No token provided in cookies or headers");
			return reply.status(401).send({
				success: false,
				message: "No token provided",
			});
		}

		const payload = await verifyAccessToken(token);

		request.user = payload;
	} catch (error) {
		request.log?.error(error, "Token verification failed");
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
