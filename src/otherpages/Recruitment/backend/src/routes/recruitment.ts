import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { sql } from "../db/index.js";

// Helper to normalize Indian phone number: strips +91, 0, spaces, dashes
function cleanPhoneNumber(val: unknown): string {
  if (typeof val !== "string") return "";
  let digits = val.replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length === 12) {
    digits = digits.slice(2);
  } else if (digits.startsWith("0") && digits.length === 11) {
    digits = digits.slice(1);
  }
  return digits;
}

// Helper to sanitize optional text / url
function sanitizeOptionalString(val: unknown): string | null {
  if (typeof val !== "string") return null;
  const trimmed = val.trim();
  return trimmed.length > 0 ? trimmed : null;
}

const recruitmentSchema = z.object({
  fullName: z
    .string({ required_error: "Full name is required" })
    .trim()
    .min(1, "Full name cannot be empty")
    .max(100, "Full name is too long"),
  branch: z
    .string({ required_error: "Branch is required" })
    .trim()
    .min(1, "Branch cannot be empty")
    .max(50, "Branch is too long"),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Invalid email format")
    .max(120, "Email is too long"),
  rollNumber: z
    .string({ required_error: "Roll number is required" })
    .trim()
    .min(1, "Roll number cannot be empty")
    .max(50, "Roll number is too long"),
  whatsappNumber: z
    .string({ required_error: "WhatsApp number is required" })
    .trim()
    .refine(
      (val) => /^[0-9]{10}$/.test(val),
      "WhatsApp number must contain exactly 10 digits with no letters or special characters"
    ),
  callingNumber: z
    .string()
    .optional()
    .nullable()
    .transform(sanitizeOptionalString)
    .refine(
      (val) => {
        if (!val) return true;
        return /^[0-9]{10}$/.test(val);
      },
      "Calling number must contain exactly 10 digits with no letters or special characters if provided"
    ),
  whyJoin: z
    .string({ required_error: "Why join EDC question is required" })
    .trim()
    .min(10, "Please provide a response for why you want to join EDC (at least 10 characters)")
    .max(3000, "Response is too long"),
  experience: z
    .string({ required_error: "Past experience / PORs question is required" })
    .trim()
    .min(5, "Please describe your past experiences or PORs (at least 5 characters)")
    .max(3000, "Response is too long"),
  otherSocieties: z
    .string()
    .optional()
    .nullable()
    .transform(sanitizeOptionalString),
  commitment: z
    .string({ required_error: "Commitment question is required" })
    .trim()
    .min(10, "Please describe how you will manage your commitments (at least 10 characters)")
    .max(3000, "Response is too long"),
  subTeams: z
    .array(z.string().trim().min(1), {
      required_error: "At least one sub-team must be selected",
    })
    .min(1, "Select at least 1 sub-team")
    .max(2, "Select at most 2 sub-teams"),
  discoverySource: z
    .string({ required_error: "Discovery source is required" })
    .trim()
    .min(1, "Discovery source cannot be empty")
    .max(100, "Discovery source is too long"),
  portfolioLink: z
    .string()
    .optional()
    .nullable()
    .transform(sanitizeOptionalString),
  resumeLink: z
    .string()
    .optional()
    .nullable()
    .transform(sanitizeOptionalString),
  campusIdeas: z
    .string({ required_error: "Campus inefficiencies and solutions question is required" })
    .trim()
    .min(10, "Please provide your campus ideas and observations (at least 10 characters)")
    .max(3000, "Response is too long"),
  // Honeypot field for bot spam detection
  _hp: z.string().optional().nullable(),
});

export const recruitmentRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post("/api/recruitment", async (request, reply) => {
    // 1. Zod Validation
    const parseResult = recruitmentSchema.safeParse(request.body);

    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      const firstErrorMessage =
        Object.values(fieldErrors).flat()[0] || "Validation failed";
      return reply.status(400).send({
        success: false,
        message: firstErrorMessage,
        errors: fieldErrors,
      });
    }

    const data = parseResult.data;

    // 2. Honeypot check (Silent drop if bot filled hidden field)
    if (data._hp && data._hp.trim().length > 0) {
      fastify.log.warn("Honeypot triggered, dropping bot submission");
      return reply.status(200).send({
        success: true,
        message: "Application submitted successfully",
        applicationId: 0,
      });
    }

    try {
      // 3. Insert application into Neon PostgreSQL using parameterized query
      const result = await sql`
        INSERT INTO recruitment_applications (
          full_name,
          branch,
          email,
          roll_number,
          whatsapp_number,
          calling_number,
          why_join,
          experience,
          other_societies,
          commitment,
          sub_teams,
          discovery_source,
          portfolio_link,
          resume_link,
          campus_ideas
        ) VALUES (
          ${data.fullName},
          ${data.branch},
          ${data.email.toLowerCase()},
          ${data.rollNumber.trim()},
          ${data.whatsappNumber},
          ${data.callingNumber},
          ${data.whyJoin},
          ${data.experience},
          ${data.otherSocieties},
          ${data.commitment},
          ${data.subTeams},
          ${data.discoverySource},
          ${data.portfolioLink},
          ${data.resumeLink},
          ${data.campusIdeas}
        )
        RETURNING id, created_at;
      `;

      const inserted = result[0];

      return reply.status(201).send({
        success: true,
        message: "Application submitted successfully",
        applicationId: inserted.id,
      });
    } catch (error: any) {
      fastify.log.error(error, "Failed to insert recruitment application");

      // Handle Unique Constraint Violation (Postgres error code 23505)
      if (error && (error.code === "23505" || String(error.message).includes("unique constraint") || String(error.message).includes("duplicate key"))) {
        let fieldName = "email or roll number";
        if (String(error.detail || error.message).includes("roll_number") || String(error.message).includes("idx_recruitment_roll")) {
          fieldName = "roll number";
        } else if (String(error.detail || error.message).includes("email") || String(error.message).includes("idx_recruitment_email")) {
          fieldName = "email";
        }

        return reply.status(409).send({
          success: false,
          message: `An application with this ${fieldName} has already been submitted.`,
        });
      }

      // Generic safe error message (never expose DB credentials or internals)
      return reply.status(500).send({
        success: false,
        message: "Failed to submit application. Please try again.",
      });
    }
  });
};
