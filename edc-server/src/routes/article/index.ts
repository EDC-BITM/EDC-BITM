import type { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import type { AuthenticatedRequest } from "../../middleware/auth.js";
import { authenticate, requireRole } from "../../middleware/auth.js";

const prisma = new PrismaClient();

interface CreateArticleBody {
  title: string;
  content: any;
  published?: boolean;
}

interface UpdateArticleBody {
  title?: string;
  content?: any;
  published?: boolean;
}

export default async function articleRoutes(fastify: FastifyInstance) {
  // Get all articles (published only for non-authenticated users)
  fastify.get("/", async (request: AuthenticatedRequest, reply) => {
    try {
      const {
        page = 1,
        limit = 10,
        search,
      } = request.query as {
        page?: number;
        limit?: number;
        search?: string;
      };

      const skip = (Number(page) - 1) * Number(limit);
      const take = Number(limit);

      const where: any = {};

      // Note: Showing all articles for now. To filter by published status:
      // if (!request.user) {
      // 	where.published = true;
      // }

      // Add search filter if provided
      if (search) {
        where.title = { contains: search, mode: "insensitive" };
      }
      const [articles, total] = await Promise.all([
        prisma.article.findMany({
          where,
          skip,
          take,
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        }),
        prisma.article.count({ where }),
      ]);

      return reply.send({
        success: true,
        data: {
          articles,
          pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / Number(limit)),
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

  // Get single article by ID
  fastify.get("/:id", async (request: AuthenticatedRequest, reply) => {
    try {
      const { id } = request.params as { id: string };

      const article = await prisma.article.findUnique({
        where: { id },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      if (!article) {
        return reply.status(404).send({
          success: false,
          message: "Article not found",
        });
      }

      return reply.send({
        success: true,
        data: { article },
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        success: false,
        message: "Internal server error",
      });
    }
  });

  // Get user's own articles
  fastify.get(
    "/my/articles",
    { preHandler: authenticate },
    async (request: AuthenticatedRequest, reply) => {
      try {
        if (!request.user) {
          return reply.status(401).send({
            success: false,
            message: "Not authenticated",
          });
        }

        const { page = 1, limit = 10 } = request.query as {
          page?: number;
          limit?: number;
        };

        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);

        const [articles, total] = await Promise.all([
          prisma.article.findMany({
            where: { authorId: request.user.userId },
            skip,
            take,
            orderBy: { createdAt: "desc" },
          }),
          prisma.article.count({ where: { authorId: request.user.userId } }),
        ]);

        return reply.send({
          success: true,
          data: {
            articles,
            pagination: {
              page: Number(page),
              limit: Number(limit),
              total,
              totalPages: Math.ceil(total / Number(limit)),
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
    }
  );

  // Create new article
  fastify.post<{ Body: CreateArticleBody }>(
    "/",
    { preHandler: authenticate },
    async (request: AuthenticatedRequest, reply) => {
      try {
        if (!request.user) {
          return reply.status(401).send({
            success: false,
            message: "Not authenticated",
          });
        }

        const {
          title,
          content,
          published = false,
        } = request.body as CreateArticleBody;

        if (!title || !content) {
          return reply.status(400).send({
            success: false,
            message: "Title and content are required",
          });
        }

        if (title.length < 3 || title.length > 200) {
          return reply.status(400).send({
            success: false,
            message: "Title must be between 3 and 200 characters",
          });
        }

        // If publishing this article, unpublish all other articles first
        if (Boolean(published)) {
          await prisma.article.updateMany({
            where: { published: true },
            data: { published: false },
          });
        }

        const article = await prisma.article.create({
          data: {
            title: title.trim(),
            content,
            published: Boolean(published),
            authorId: request.user.userId,
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        });

        return reply.status(201).send({
          success: true,
          message: "Article created successfully",
          data: { article },
        });
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({
          success: false,
          message: "Internal server error",
        });
      }
    }
  );

  // Update article
  fastify.patch<{ Body: UpdateArticleBody }>(
    "/:id",
    { preHandler: authenticate },
    async (request: AuthenticatedRequest, reply) => {
      try {
        if (!request.user) {
          return reply.status(401).send({
            success: false,
            message: "Not authenticated",
          });
        }

        const { id } = request.params as { id: string };
        const { title, content, published } = request.body as UpdateArticleBody;

        // Find article
        const article = await prisma.article.findUnique({
          where: { id },
        });

        if (!article) {
          return reply.status(404).send({
            success: false,
            message: "Article not found",
          });
        }

        // Check if user is the author or admin
        if (
          article.authorId !== request.user.userId &&
          request.user.role !== "ADMIN"
        ) {
          return reply.status(403).send({
            success: false,
            message: "You don't have permission to update this article",
          });
        }

        // Validate title if provided
        if (title && (title.length < 3 || title.length > 200)) {
          return reply.status(400).send({
            success: false,
            message: "Title must be between 3 and 200 characters",
          });
        }

        // If publishing this article, unpublish all other articles first
        if (published === true) {
          await prisma.article.updateMany({
            where: {
              published: true,
              id: { not: id },
            },
            data: { published: false },
          });
        }

        const updatedArticle = await prisma.article.update({
          where: { id },
          data: {
            ...(title && { title: title.trim() }),
            ...(content && { content }),
            ...(published !== undefined && { published: Boolean(published) }),
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        });

        return reply.send({
          success: true,
          message: "Article updated successfully",
          data: { article: updatedArticle },
        });
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({
          success: false,
          message: "Internal server error",
        });
      }
    }
  );

  // Delete article
  fastify.delete(
    "/:id",
    { preHandler: authenticate },
    async (request: AuthenticatedRequest, reply) => {
      try {
        if (!request.user) {
          return reply.status(401).send({
            success: false,
            message: "Not authenticated",
          });
        }

        const { id } = request.params as { id: string };

        // Find article
        const article = await prisma.article.findUnique({
          where: { id },
        });

        if (!article) {
          return reply.status(404).send({
            success: false,
            message: "Article not found",
          });
        }

        // Check if user is the author or admin
        if (
          article.authorId !== request.user.userId &&
          request.user.role !== "ADMIN"
        ) {
          return reply.status(403).send({
            success: false,
            message: "You don't have permission to delete this article",
          });
        }

        await prisma.article.delete({
          where: { id },
        });

        return reply.send({
          success: true,
          message: "Article deleted successfully",
        });
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({
          success: false,
          message: "Internal server error",
        });
      }
    }
  );

  // get only published articles
  fastify.get("/announcement", async (_request, reply) => {
    try {
      const data = await prisma.article.findFirst({
        where: { published: true },
        orderBy: { createdAt: "desc" },
      });

	  if (!data) {
		return reply.status(404).send({
          success: false,
          message: "No published articles found",
        });
	  }
      return reply.send({
        success: true,
        data,
      });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({
        success: false,
        message: "Internal server error",
      });
    }
  });
}
