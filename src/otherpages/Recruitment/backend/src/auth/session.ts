import { createHmac, timingSafeEqual } from "node:crypto";
import type { FastifyReply, FastifyRequest } from "fastify";

export const COOKIE_NAME = "edc_recruitment_session";

function getAdminUsername(): string {
  return process.env.RECRUITMENT_ADMIN_USERNAME?.trim() || "edc_admin";
}

function getAdminPassword(): string {
  return process.env.RECRUITMENT_ADMIN_PASSWORD?.trim() || "edc_recruitment_2026!";
}

function getSessionSecret(): string {
  return (
    process.env.RECRUITMENT_SESSION_SECRET?.trim() ||
    "edc-recruitment-admin-secret-2026-production-key-bitmesra"
  );
}

/**
 * Validates admin credentials using timing-safe comparison
 */
export function validateAdminCredentials(username?: string, password?: string): boolean {
  if (!username || !password) return false;

  const expectedUser = getAdminUsername();
  const expectedPass = getAdminPassword();

  const userBuf = Buffer.from(username.trim());
  const expUserBuf = Buffer.from(expectedUser);

  const passBuf = Buffer.from(password.trim());
  const expPassBuf = Buffer.from(expectedPass);

  const userMatch =
    userBuf.length === expUserBuf.length && timingSafeEqual(userBuf, expUserBuf);
  const passMatch =
    passBuf.length === expPassBuf.length && timingSafeEqual(passBuf, expPassBuf);

  return userMatch && passMatch;
}

interface SessionPayload {
  u: string;
  exp: number;
}

/**
 * Creates a signed HMAC session token
 */
export function createSessionToken(username: string, durationMs = 7 * 24 * 60 * 60 * 1000): string {
  const payload: SessionPayload = {
    u: username,
    exp: Date.now() + durationMs,
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const hmac = createHmac("sha256", getSessionSecret());
  hmac.update(payloadB64);
  const signature = hmac.digest("base64url");

  return `${payloadB64}.${signature}`;
}

/**
 * Verifies a signed HMAC session token
 */
export function verifySessionToken(token?: string): { valid: boolean; username?: string } {
  if (!token || typeof token !== "string") {
    return { valid: false };
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return { valid: false };
  }

  const [payloadB64, signature] = parts;

  try {
    const hmac = createHmac("sha256", getSessionSecret());
    hmac.update(payloadB64);
    const expectedSig = hmac.digest("base64url");

    const sigBuf = Buffer.from(signature);
    const expSigBuf = Buffer.from(expectedSig);

    if (sigBuf.length !== expSigBuf.length || !timingSafeEqual(sigBuf, expSigBuf)) {
      return { valid: false };
    }

    const jsonStr = Buffer.from(payloadB64, "base64url").toString("utf-8");
    const payload: SessionPayload = JSON.parse(jsonStr);

    if (typeof payload.exp !== "number" || Date.now() > payload.exp) {
      return { valid: false };
    }

    return { valid: true, username: payload.u };
  } catch {
    return { valid: false };
  }
}

/**
 * Parses cookies from Cookie header
 */
export function parseCookies(cookieHeader?: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;

  const pairs = cookieHeader.split(";");
  for (const pair of pairs) {
    const idx = pair.indexOf("=");
    if (idx === -1) continue;
    const key = pair.substring(0, idx).trim();
    const val = pair.substring(idx + 1).trim();
    cookies[key] = decodeURIComponent(val);
  }

  return cookies;
}

export interface CookieSerializeOptions {
  maxAgeSeconds?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
  path?: string;
}

/**
 * Serializes a cookie for Set-Cookie header
 */
export function serializeCookie(
  name: string,
  value: string,
  options: CookieSerializeOptions = {}
): string {
  const isProd = process.env.NODE_ENV === "production";
  const parts: string[] = [`${name}=${encodeURIComponent(value)}`];

  const path = options.path ?? "/";
  parts.push(`Path=${path}`);

  const httpOnly = options.httpOnly ?? true;
  if (httpOnly) parts.push("HttpOnly");

  const sameSite = options.sameSite ?? "Lax";
  parts.push(`SameSite=${sameSite}`);

  const secure = options.secure ?? (isProd && sameSite === "None");
  if (secure) parts.push("Secure");

  if (typeof options.maxAgeSeconds === "number") {
    parts.push(`Max-Age=${options.maxAgeSeconds}`);
  }

  return parts.join("; ");
}

/**
 * Serializes an expired cookie to delete it
 */
export function serializeExpiredCookie(name: string, path = "/"): string {
  return `${name}=; Path=${path}; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

declare module "fastify" {
  interface FastifyRequest {
    admin?: {
      username: string;
    };
  }
}

/**
 * Fastify preHandler hook to protect recruitment admin endpoints
 */
export async function requireRecruitmentAdmin(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const cookieHeader = request.headers.cookie;
  const cookies = parseCookies(cookieHeader);
  const token = cookies[COOKIE_NAME];

  const verification = verifySessionToken(token);
  if (!verification.valid || !verification.username) {
    reply.status(401).send({
      success: false,
      message: "Unauthorized: Active recruitment admin session required",
    });
    return;
  }

  request.admin = {
    username: verification.username,
  };
}
