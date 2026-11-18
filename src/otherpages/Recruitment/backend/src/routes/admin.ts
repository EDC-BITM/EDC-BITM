import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { sql } from "../db/index.js";
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

const getApplicationsQuerySchema = z.object({
  search: z.string().optional(),
  branch: z.string().optional(),
  subTeam: z.string().optional(),
});

function formatApplicationRow(row: any) {
  return {
    id: row.id,
    fullName: row.full_name,
    branch: row.branch,
    email: row.email,
    rollNumber: row.roll_number,
    whatsappNumber: row.whatsapp_number,
    callingNumber: row.calling_number,
    whyJoin: row.why_join,
    experience: row.experience,
    otherSocieties: row.other_societies,
    commitment: row.commitment,
    subTeams: Array.isArray(row.sub_teams) ? row.sub_teams : [],
    discoverySource: row.discovery_source,
    portfolioLink: row.portfolio_link,
    resumeLink: row.resume_link,
    campusIdeas: row.campus_ideas,
    status: row.status,
    createdAt: row.created_at,
  };
}

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

  // 4. Get All Recruitment Applications with Search and Filter
  fastify.get(
    "/api/recruitment/admin/applications",
    { preHandler: [requireRecruitmentAdmin] },
    async (request, reply) => {
      const queryResult = getApplicationsQuerySchema.safeParse(request.query);
      const query = queryResult.success ? queryResult.data : {};

      const searchParam = query.search?.trim();
      const searchPattern = searchParam && searchParam.length > 0 ? `%${searchParam}%` : null;

      const branchParam = query.branch?.trim();
      const branchFilter = branchParam && branchParam.toLowerCase() !== "all" ? branchParam : null;

      const subTeamParam = query.subTeam?.trim();
      const subTeamFilter = subTeamParam && subTeamParam.toLowerCase() !== "all" ? subTeamParam : null;

      try {
        // Query total applications count
        const countResult = await sql`SELECT count(*)::int as total FROM recruitment_applications;`;
        const totalCount = countResult[0]?.total ?? 0;

        // Query applications with optional search and filters
        const rows = await sql`
          SELECT
            id,
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
            campus_ideas,
            status,
            created_at
          FROM recruitment_applications
          WHERE
            (${searchPattern} IS NULL OR full_name ILIKE ${searchPattern} OR email ILIKE ${searchPattern} OR roll_number ILIKE ${searchPattern})
            AND (${branchFilter} IS NULL OR branch = ${branchFilter})
            AND (${subTeamFilter} IS NULL OR ${subTeamFilter} = ANY(sub_teams))
          ORDER BY created_at DESC;
        `;

        const applications = rows.map(formatApplicationRow);

        return reply.status(200).send({
          success: true,
          totalCount,
          filteredCount: applications.length,
          applications,
        });
      } catch (error) {
        fastify.log.error(error, "Failed to fetch recruitment applications");
        return reply.status(500).send({
          success: false,
          message: "Failed to load recruitment applications. Please try again.",
        });
      }
    }
  );

  // 5. Get Single Recruitment Application Details
  fastify.get(
    "/api/recruitment/admin/applications/:id",
    { preHandler: [requireRecruitmentAdmin] },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const applicationId = parseInt(id, 10);

      if (isNaN(applicationId) || applicationId <= 0) {
        return reply.status(400).send({
          success: false,
          message: "Invalid application ID",
        });
      }

      try {
        const rows = await sql`
          SELECT
            id,
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
            campus_ideas,
            status,
            created_at
          FROM recruitment_applications
          WHERE id = ${applicationId}
          LIMIT 1;
        `;

        if (!rows || rows.length === 0) {
          return reply.status(404).send({
            success: false,
            message: "Recruitment application not found",
          });
        }

        return reply.status(200).send({
          success: true,
          application: formatApplicationRow(rows[0]),
        });
      } catch (error) {
        fastify.log.error(error, `Failed to fetch application ${id}`);
        return reply.status(500).send({
          success: false,
          message: "Failed to retrieve recruitment application",
        });
      }
    }
  );

  // 6. Delete Recruitment Application Permanently
  fastify.delete(
    "/api/recruitment/admin/applications/:id",
    { preHandler: [requireRecruitmentAdmin] },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const applicationId = parseInt(id, 10);

      if (isNaN(applicationId) || applicationId <= 0) {
        return reply.status(400).send({
          success: false,
          message: "Invalid application ID",
        });
      }

      try {
        const result = await sql`
          DELETE FROM recruitment_applications
          WHERE id = ${applicationId}
          RETURNING id, full_name, roll_number;
        `;

        if (!result || result.length === 0) {
          return reply.status(404).send({
            success: false,
            message: "Recruitment application not found or already deleted",
          });
        }

        const deleted = result[0];
        fastify.log.info(
          { applicationId, admin: request.admin?.username },
          "Recruitment application permanently deleted"
        );

        return reply.status(200).send({
          success: true,
          message: `Application for ${deleted.full_name} (${deleted.roll_number}) deleted permanently.`,
          id: deleted.id,
        });
      } catch (error) {
        fastify.log.error(error, `Failed to delete application ${id}`);
        return reply.status(500).send({
          success: false,
          message: "Failed to delete recruitment application. Please try again.",
        });
      }
    }
  );
};
