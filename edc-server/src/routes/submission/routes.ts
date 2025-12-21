import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  getSubmissionsByEmail,
  updateSubmission,
  deleteSubmission,
  getSubmissionStats,
} from '../../controllers/submission/controller.js';
import {
  sanitizeInput,
  validateSubmission,
  validateSubmissionUpdate,
} from '../../middleware/submission/validation.js';

export async function submissionRoutes(fastify: FastifyInstance) {

  fastify.addHook('preHandler', sanitizeInput);



  fastify.post<{
    Body: any;
  }>(
    '/',
    {
      schema: {
        body: {
          type: 'object',
          required: [
            'name',
            'email',
            'title',
            'oneLiner',
            'problemStatement',
            'solution',
            'currentStage',
          ],
          properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            title: { type: 'string' },
            oneLiner: { type: 'string' },
            problemStatement: { type: 'string' },
            solution: { type: 'string' },
            currentStage: {
              type: 'string',
              enum: ['IDEA', 'PROTOTYPE', 'EARLY_CUSTOMERS', 'REVENUE'],
            },
            batch: { type: 'string' },
            rollNumber: { type: 'string' },
            contactNumber: { type: 'string' },
            teamMembers: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  role: { type: 'string' },
                  batch: { type: 'string' },
                  rollNumber: { type: 'string' },
                },
              },
            },
          },
        },
        response: {
          201: {
            description: 'Submission created successfully',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: { 
                type: 'object',
                additionalProperties: true
              },
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      await validateSubmission(request, reply);
      if (reply.sent) return; // Stop if validation already sent a response
      return createSubmission(request, reply);
    }
  );


  fastify.get<{
    Querystring: {
      page?: string;
      limit?: string;
      stage?: string;
      email?: string;
    };
  }>(
    '/',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            page: { type: 'string', default: '1' },
            limit: { type: 'string', default: '10' },
            stage: {
              type: 'string',
              enum: ['IDEA', 'PROTOTYPE', 'EARLY_CUSTOMERS', 'REVENUE'],
            },
            email: { type: 'string' },
          },
        },
        response: {
          200: {
            description: 'List of submissions',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: { type: 'array' },
              pagination: { type: 'object' },
            },
          },
        },
      },
    },
    getAllSubmissions
  );


  fastify.get<{
    Params: { id: string };
  }>(
    '/:id',
    {
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' },
          },
        },
        response: {
          200: {
            description: 'Submission details',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: { 
                type: 'object',
                additionalProperties: true  // Allow all properties
              },
            },
          },
          404: {
            description: 'Submission not found',
          },
        },
      },
    },
    getSubmissionById
  );


  fastify.get<{
    Params: { email: string };
  }>(
    '/user/:email',
    {
      schema: {
        params: {
          type: 'object',
          required: ['email'],
          properties: {
            email: { type: 'string', format: 'email' },
          },
        },
        response: {
          200: {
            description: 'List of submissions for user',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: { type: 'array' },
              count: { type: 'number' },
            },
          },
        },
      },
    },
    getSubmissionsByEmail
  );


  fastify.put<{
    Params: { id: string };
    Body: any;
  }>(
    '/:id',
    {
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' },
          },
        },
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            title: { type: 'string' },
            oneLiner: { type: 'string' },
            problemStatement: { type: 'string' },
            solution: { type: 'string' },
            currentStage: {
              type: 'string',
              enum: ['IDEA', 'PROTOTYPE', 'EARLY_CUSTOMERS', 'REVENUE'],
            },
          },
        },
        response: {
          200: {
            description: 'Submission updated',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: { type: 'object' },
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      await validateSubmissionUpdate(request, reply);
      if (reply.sent) return; // Stop if validation already sent a response
      return updateSubmission(request, reply);
    }
  );


  fastify.delete<{
    Params: { id: string };
  }>(
    '/:id',
    {
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' },
          },
        },
        response: {
          200: {
            description: 'Submission deleted',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              message: { type: 'string' },
            },
          },
        },
      },
    },
    deleteSubmission
  );


  fastify.get(
    '/stats/overview',
    {
      schema: {
        response: {
          200: {
            description: 'Submission statistics',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              data: {
                type: 'object',
                properties: {
                  total: { type: 'number' },
                  byStage: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        stage: { type: 'string' },
                        count: { type: 'number' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    getSubmissionStats
  );
}