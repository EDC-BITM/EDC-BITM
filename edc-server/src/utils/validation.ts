export function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

export function validateName(name: string): {
	valid: boolean;
	message?: string;
} {
	if (!name || name.trim().length === 0) {
		return { valid: false, message: "Name is required" };
	}
	if (name.length < 2) {
		return { valid: false, message: "Name must be at least 2 characters long" };
	}
	if (name.length > 50) {
		return { valid: false, message: "Name must be less than 50 characters" };
	}
	return { valid: true };
}

export function validateEmail(email: string): {
	valid: boolean;
	message?: string;
} {
	if (!email || email.trim().length === 0) {
		return { valid: false, message: "Email is required" };
	}
	if (!isValidEmail(email)) {
		return { valid: false, message: "Invalid email format" };
	}
	return { valid: true };
}
