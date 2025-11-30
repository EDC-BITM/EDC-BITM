import * as jose from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key";
const REFRESH_SECRET =
	process.env.REFRESH_SECRET || "your-super-secret-refresh-key";

const secret = new TextEncoder().encode(JWT_SECRET);
const refreshSecret = new TextEncoder().encode(REFRESH_SECRET);

export interface JWTPayload {
	userId: string;
	email: string;
	role: string;
}

export async function generateAccessToken(
	payload: JWTPayload,
): Promise<string> {
	return await new jose.SignJWT({ ...payload })
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("15m") // Short-lived access token
		.sign(secret);
}

export async function generateRefreshToken(userId: string): Promise<string> {
	return await new jose.SignJWT({ userId })
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("7d") // Long-lived refresh token
		.sign(refreshSecret);
}

export async function verifyAccessToken(token: string): Promise<JWTPayload> {
	try {
		const { payload } = await jose.jwtVerify(token, secret);
		return payload as unknown as JWTPayload;
	} catch (error) {
		throw new Error("Invalid or expired token");
	}
}

export async function verifyRefreshToken(
	token: string,
): Promise<{ userId: string }> {
	try {
		const { payload } = await jose.jwtVerify(token, refreshSecret);
		return payload as { userId: string };
	} catch (error) {
		throw new Error("Invalid or expired refresh token");
	}
}
