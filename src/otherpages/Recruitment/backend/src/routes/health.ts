import type { FastifyPluginAsync } from "fastify";
import { checkDatabaseConnection } from "../db/index.js";

export const healthRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/health", async (_request, reply) => {
    try {
      const isDbConnected = await checkDatabaseConnection();

      if (!isDbConnected) {
        return reply.status(503).send({
          status: "unhealthy",
          database: "disconnected",
        });
      }

      return reply.status(200).send({
        status: "healthy",
        database: "connected",
      });
    } catch (error) {
      fastify.log.error(error, "Health check failed");
      return reply.status(503).send({
        status: "unhealthy",
        database: "disconnected",
      });
    }
  });
};
