import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { sql } from "../db/index.js";

// Fixed hardcoded admin credentials for recruitment coordinators
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "edc_recruitment_2026!";

const AUTH_COOKIE =
  "edc_recruitment_session=authenticated; Path=/; HttpOnly; SameSite=Lax";
const LOGOUT_COOKIE =
  "edc_recruitment_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT";

/**
 * Lightweight middleware: checks for recruitment admin session cookie
 */
async function requireAdmin(request: FastifyRequest, reply: FastifyReply) {
  const cookieHeader = request.headers.cookie || "";
  if (!cookieHeader.includes("edc_recruitment_session=authenticated")) {
    return reply.status(401).send({
      success: false,
      message: "Unauthorized: Admin login required",
    });
  }
}

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
  // 1. Admin Login (Simple if-else credential check)
  fastify.post("/api/recruitment/admin/login", async (request, reply) => {
    const { username, password } = (request.body as any) || {};

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      reply.header("Set-Cookie", AUTH_COOKIE);
      return reply.status(200).send({
        success: true,
        message: "Admin authentication successful",
        user: { username: ADMIN_USERNAME },
      });
    } else {
      return reply.status(401).send({
        success: false,
        message: "Invalid credentials. Please verify username and password.",
      });
    }
  });

  // 2. Admin Logout
  fastify.post("/api/recruitment/admin/logout", async (_request, reply) => {
    reply.header("Set-Cookie", LOGOUT_COOKIE);
    return reply.status(200).send({
      success: true,
      message: "Logged out successfully",
    });
  });

  // 3. Verify Admin Session
  fastify.get(
    "/api/recruitment/admin/me",
    { preHandler: [requireAdmin] },
    async (_request, reply) => {
      return reply.status(200).send({
        success: true,
        authenticated: true,
        user: { username: ADMIN_USERNAME },
      });
    }
  );

  // 4. Get All Recruitment Applications with Search and Filter
  fastify.get(
    "/api/recruitment/admin/applications",
    { preHandler: [requireAdmin] },
    async (request, reply) => {
      const query = (request.query as any) || {};

      const searchParam = typeof query.search === "string" ? query.search.trim() : "";
      const searchPattern = searchParam.length > 0 ? `%${searchParam}%` : null;

      const branchParam = typeof query.branch === "string" ? query.branch.trim() : "";
      const branchFilter = branchParam && branchParam.toLowerCase() !== "all" ? branchParam : null;

      const subTeamParam = typeof query.subTeam === "string" ? query.subTeam.trim() : "";
      const subTeamFilter = subTeamParam && subTeamParam.toLowerCase() !== "all" ? subTeamParam : null;

      try {
        const countResult = await sql`SELECT count(*)::int as total FROM recruitment_applications;`;
        const totalCount = countResult[0]?.total ?? 0;

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
            (${searchPattern}::text IS NULL OR full_name ILIKE ${searchPattern}::text OR email ILIKE ${searchPattern}::text OR roll_number ILIKE ${searchPattern}::text)
            AND (${branchFilter}::text IS NULL OR branch = ${branchFilter}::text)
            AND (${subTeamFilter}::text IS NULL OR ${subTeamFilter}::text = ANY(sub_teams))
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
    { preHandler: [requireAdmin] },
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
    { preHandler: [requireAdmin] },
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
          { applicationId },
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
