// biome-ignore assist/source/organizeImports: preserve manual import order
import type { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import {
	hashPassword,
	comparePassword,
	validatePassword,
} from "../../utils/password.js";
import { validateEmail, validateName } from "../../utils/validation.js";
import {
	generateAccessToken,
	generateRefreshToken,
	verifyRefreshToken,
} from "../../utils/jwt.js";
import type { AuthenticatedRequest } from "../../middleware/auth.js";
import { authenticate } from "../../middleware/auth.js";

const prisma = new PrismaClient();

interface RegisterBody {
	email: string;
	name: string;
	password: string;
}

interface LoginBody {
	email: string;
	password: string;
}

interface RefreshBody {
	refreshToken: string;
}

export default async function authRoutes(fastify: FastifyInstance) {
	// small cookie parser helper to avoid depending on cookie plugin types in routes
	function getCookieValue(request: any, name: string) {
		const header = request.headers?.cookie;
		if (!header) return undefined;
		const parts = header.split(";").map((p: string) => p.trim());
		for (const part of parts) {
			const [k, v] = part.split("=");
			if (k === name) return decodeURIComponent(v || "");
		}
		return undefined;
	}
	// Register route
	fastify.post<{ Body: RegisterBody }>("/register", async (request, reply) => {
		try {
			const { email, name, password } = request.body;

			// Validate input
			const emailValidation = validateEmail(email);
			if (!emailValidation.valid) {
				return reply.status(400).send({
					success: false,
					message: emailValidation.message,
				});
			}

			const nameValidation = validateName(name);
			if (!nameValidation.valid) {
				return reply.status(400).send({
					success: false,
					message: nameValidation.message,
				});
			}

			const passwordValidation = validatePassword(password);
			if (!passwordValidation.valid) {
				return reply.status(400).send({
					success: false,
					message: passwordValidation.message,
				});
			}

			// Check if user already exists
			const existingUser = await prisma.user.findUnique({
				where: { email: email.toLowerCase() },
			});

			if (existingUser) {
				return reply.status(409).send({
					success: false,
					message: "User with this email already exists",
				});
			}

			// Hash password
			const hashedPassword = await hashPassword(password);

			// Create user
			const user = await prisma.user.create({
				data: {
					email: email.toLowerCase(),
					name: name.trim(),
					password: hashedPassword,
					role: "USER",
				},
			});

			// Generate tokens
			const accessToken = await generateAccessToken({
				userId: user.id,
				email: user.email,
				role: user.role,
			});
			const refreshToken = await generateRefreshToken(user.id);

			// Store refresh token in database
			await prisma.refreshToken.create({
				data: {
					token: refreshToken,
					userId: user.id,
					expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
				},
			});

			// Set both access and refresh tokens as httpOnly cookies
			const accessCookieOptions = [
				`HttpOnly`,
				`Path=/`,
				`Max-Age=${15 * 60}`, // 15 minutes
				process.env.NODE_ENV === "production" ? `Secure` : undefined,
				process.env.NODE_ENV === "production" ? `SameSite=None` : `SameSite=Lax`,
			]
				.filter(Boolean)
				.join("; ");

			const refreshCookieOptions = [
				`HttpOnly`,
				`Path=/`,
				`Max-Age=${7 * 24 * 60 * 60}`, // 7 days
				process.env.NODE_ENV === "production" ? `Secure` : undefined,
				process.env.NODE_ENV === "production" ? `SameSite=None` : `SameSite=Lax`,
			]
				.filter(Boolean)
				.join("; ");

			reply.header("Set-Cookie", [
				`accessToken=${accessToken}; ${accessCookieOptions}`,
				`refreshToken=${refreshToken}; ${refreshCookieOptions}`,
			]);

			return reply.status(201).send({
				success: true,
				message: "User registered successfully",
				data: {
					user: {
						id: user.id,
						email: user.email,
						name: user.name,
						role: user.role,
						createdAt: user.createdAt,
					},
				},
			});
		} catch (error) {
			fastify.log.error(error);
			return reply.status(500).send({
				success: false,
				message: "Internal server error",
			});
		}
	});

	// Login route
	fastify.post<{ Body: LoginBody }>("/login", async (request, reply) => {
		try {
			const { email, password } = request.body;

			// Validate input
			if (!email || !password) {
				return reply.status(400).send({
					success: false,
					message: "Email and password are required",
				});
			}

			// Find user
			const user = await prisma.user.findUnique({
				where: { email: email.toLowerCase() },
			});

			if (!user) {
				return reply.status(401).send({
					success: false,
					message: "Invalid credentials",
				});
			}

			// Verify password
			const isValidPassword = await comparePassword(password, user.password);
			if (!isValidPassword) {
				return reply.status(401).send({
					success: false,
					message: "Invalid credentials",
				});
			}

			// Generate tokens
			const accessToken = await generateAccessToken({
				userId: user.id,
				email: user.email,
				role: user.role,
			});
			const refreshToken = await generateRefreshToken(user.id);

			// Store refresh token in database
			await prisma.refreshToken.create({
				data: {
					token: refreshToken,
					userId: user.id,
					expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
				},
			});

			// Set both access and refresh tokens as httpOnly cookies
			const loginAccessCookieOptions = [
				`HttpOnly`,
				`Path=/`,
				`Max-Age=${15 * 60}`, // 15 minutes
				process.env.NODE_ENV === "production" ? `Secure` : undefined,
				process.env.NODE_ENV === "production" ? `SameSite=None` : `SameSite=Lax`,
			]
				.filter(Boolean)
				.join("; ");

			const loginRefreshCookieOptions = [
				`HttpOnly`,
				`Path=/`,
				`Max-Age=${7 * 24 * 60 * 60}`, // 7 days
				process.env.NODE_ENV === "production" ? `Secure` : undefined,
				process.env.NODE_ENV === "production" ? `SameSite=None` : `SameSite=Lax`,
			]
				.filter(Boolean)
				.join("; ");

			reply.header("Set-Cookie", [
				`accessToken=${accessToken}; ${loginAccessCookieOptions}`,
				`refreshToken=${refreshToken}; ${loginRefreshCookieOptions}`,
			]);

			return reply.send({
				success: true,
				message: "Login successful",
				data: {
					user: {
						id: user.id,
						email: user.email,
						name: user.name,
						role: user.role,
					},
				},
			});
		} catch (error) {
			fastify.log.error(error);
			return reply.status(500).send({
				success: false,
				message: "Internal server error",
			});
		}
	});

	// Refresh token route
	fastify.post<{ Body: RefreshBody }>("/refresh", async (request, reply) => {
		try {
			// Get refresh token from cookie or body
			const refreshToken =
				getCookieValue(request, "refreshToken") || request.body.refreshToken;

			if (!refreshToken) {
				return reply.status(401).send({
					success: false,
					message: "Refresh token not provided",
				});
			}

			// Verify refresh token (throws if invalid)
			await verifyRefreshToken(refreshToken);

			// Check if refresh token exists in database
			const storedToken = await prisma.refreshToken.findUnique({
				where: { token: refreshToken },
				include: { user: true },
			});

			if (!storedToken || storedToken.expiresAt < new Date()) {
				// Clean up expired token
				if (storedToken) {
					await prisma.refreshToken.delete({
						where: { id: storedToken.id },
					});
				}
				return reply.status(401).send({
					success: false,
					message: "Invalid or expired refresh token",
				});
			}

			// Generate new access token
			const accessToken = await generateAccessToken({
				userId: storedToken.user.id,
				email: storedToken.user.email,
				role: storedToken.user.role,
			});

			// Set new access token as httpOnly cookie
			const refreshAccessCookieOptions = [
				`HttpOnly`,
				`Path=/`,
				`Max-Age=${15 * 60}`, // 15 minutes
				process.env.NODE_ENV === "production" ? `Secure` : undefined,
				process.env.NODE_ENV === "production" ? `SameSite=None` : `SameSite=Lax`,
			]
				.filter(Boolean)
				.join("; ");

			reply.header(
				"Set-Cookie",
				`accessToken=${accessToken}; ${refreshAccessCookieOptions}`,
			);

			return reply.send({
				success: true,
				message: "Token refreshed successfully",
			});
		} catch (error) {
			fastify.log.error(error);
			return reply.status(401).send({
				success: false,
				message: "Invalid or expired refresh token",
			});
		}
	});

	// Logout route
	fastify.post(
		"/logout",
		{ preHandler: authenticate },
		async (request: AuthenticatedRequest, reply) => {
			try {
				const refreshToken = getCookieValue(request, "refreshToken");

				if (refreshToken) {
					// Remove refresh token from database
					await prisma.refreshToken.deleteMany({
						where: { token: refreshToken },
					});
				}

				// Clear both cookies by setting expired Set-Cookie headers
				const sameSite = process.env.NODE_ENV === "production" ? "SameSite=None" : "SameSite=Lax";
				reply.header("Set-Cookie", [
					`accessToken=; Path=/; Max-Age=0; HttpOnly; ${sameSite}${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
					`refreshToken=; Path=/; Max-Age=0; HttpOnly; ${sameSite}${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
				]);

				return reply.send({
					success: true,
					message: "Logged out successfully",
				});
			} catch (error) {
				fastify.log.error(error);
				return reply.status(500).send({
					success: false,
					message: "Internal server error",
				});
			}
		},
	);

	// Get current user profile
	fastify.get(
		"/me",
		{ preHandler: authenticate },
		async (request: AuthenticatedRequest, reply) => {
			try {
				if (!request.user) {
					return reply.status(401).send({
						success: false,
						message: "Not authenticated",
					});
				}

				const user = await prisma.user.findUnique({
					where: { id: request.user.userId },
					select: {
						id: true,
						email: true,
						name: true,
						role: true,
						isEmailVerified: true,
						createdAt: true,
						updatedAt: true,
					},
				});

				if (!user) {
					return reply.status(404).send({
						success: false,
						message: "User not found",
					});
				}

				return reply.send({
					success: true,
					data: { user },
				});
			} catch (error) {
				fastify.log.error(error);
				return reply.status(500).send({
					success: false,
					message: "Internal server error",
				});
			}
		},
	);

	// Update user profile
	fastify.patch(
		"/me",
		{ preHandler: authenticate },
		async (request: AuthenticatedRequest, reply) => {
			try {
				if (!request.user) {
					return reply.status(401).send({
						success: false,
						message: "Not authenticated",
					});
				}

				const { name } = request.body as { name?: string };

				if (name) {
					const nameValidation = validateName(name);
					if (!nameValidation.valid) {
						return reply.status(400).send({
							success: false,
							message: nameValidation.message,
						});
					}
				}

				const updatedUser = await prisma.user.update({
					where: { id: request.user.userId },
					data: {
						...(name && { name: name.trim() }),
					},
					select: {
						id: true,
						email: true,
						name: true,
						role: true,
						createdAt: true,
						updatedAt: true,
					},
				});

				return reply.send({
					success: true,
					message: "Profile updated successfully",
					data: { user: updatedUser },
				});
			} catch (error) {
				fastify.log.error(error);
				return reply.status(500).send({
					success: false,
					message: "Internal server error",
				});
			}
		},
	);
}
