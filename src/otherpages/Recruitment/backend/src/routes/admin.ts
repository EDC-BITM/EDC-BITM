import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import {
  COOKIE_NAME,
  createSessionToken,
  requireRecruitmentAdmin,
  serializeCookie,
  serializeExpiredCookie,
  validateAdminCredentials,
} from "../auth/session.js";

const loginSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const adminRoutes: FastifyPluginAsync = async (fastify) => {
  // 1. Admin Login
  fastify.post("/api/recruitment/admin/login", async (request, reply) => {
    const parseResult = loginSchema.safeParse(request.body);
    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      const firstErrorMessage =
        Object.values(fieldErrors).flat()[0] || "Validation failed";
      return reply.status(400).send({
        success: false,
        message: firstErrorMessage,
      });
    }

    const { username, password } = parseResult.data;
    const isValid = validateAdminCredentials(username, password);

    if (!isValid) {
      fastify.log.warn({ username }, "Failed admin login attempt");
      return reply.status(401).send({
        success: false,
        message: "Invalid credentials. Please verify username and password.",
      });
    }

    // 7 days session
    const token = createSessionToken(username, 7 * 24 * 60 * 60 * 1000);
    const cookieHeader = serializeCookie(COOKIE_NAME, token, {
      maxAgeSeconds: 7 * 24 * 60 * 60,
      httpOnly: true,
      sameSite: "Lax",
      path: "/",
    });

    reply.header("Set-Cookie", cookieHeader);
    return reply.status(200).send({
      success: true,
      message: "Admin authentication successful",
      user: {
        username,
      },
    });
  });

  // 2. Admin Logout
  fastify.post("/api/recruitment/admin/logout", async (_request, reply) => {
    const expiredCookie = serializeExpiredCookie(COOKIE_NAME, "/");
    reply.header("Set-Cookie", expiredCookie);
    return reply.status(200).send({
      success: true,
      message: "Logged out successfully",
    });
  });

  // 3. Verify Admin Session
  fastify.get(
    "/api/recruitment/admin/me",
    { preHandler: [requireRecruitmentAdmin] },
    async (request, reply) => {
      return reply.status(200).send({
        success: true,
        authenticated: true,
        user: {
          username: request.admin?.username,
        },
      });
    }
  );
};
