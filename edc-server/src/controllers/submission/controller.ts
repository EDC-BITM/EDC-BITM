import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const teamMemberSchema = z.object({
  name: z.string().min(1, 'Team member name required'),
  email: z.string().email('Valid email required').optional().nullable(),
  contactNumber: z.string().optional().nullable(),
  batch: z.string().optional().nullable(),
  rollNumber: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
});

const submissionSchema = z.object({
  // Required fields
  name: z.string().min(1, 'Name required'),
  email: z.string().email('Valid email required'),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  oneLiner: z.string().min(1, 'One-liner required'),
  problemStatement: z.string().min(10, 'Problem statement required'),
  solution: z.string().min(10, 'Solution required'),
  currentStage: z.enum(['IDEA', 'PROTOTYPE', 'EARLY_CUSTOMERS', 'REVENUE']),


  batch: z.string().optional().nullable(),
  rollNumber: z.string().optional().nullable(),
  contactNumber: z.string().optional().nullable(),
  uniqueness: z.string().optional().nullable(),
  marketSize: z.string().optional().nullable(),
  targetCustomer: z.string().optional().nullable(),
  businessModel: z.string().optional().nullable(),
  techStack: z.string().optional().nullable(),
  competitors: z.string().optional().nullable(),
  websiteUrl: z.string().url().optional().nullable(),
  demoUrl: z.string().url().optional().nullable(),
  pitchDeckUrl: z.string().url().optional().nullable(),
  otherLinks: z.string().optional().nullable(),
  additionalInfo: z.string().optional().nullable(),
  specificGuidance: z.string().optional().nullable(),

 
  teamMembers: z.array(teamMemberSchema).optional().default([]),
});


export const createSubmission = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const validatedData = submissionSchema.parse(request.body);

    const submission = await prisma.submission.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        title: validatedData.title,
        oneLiner: validatedData.oneLiner,
        problemStatement: validatedData.problemStatement,
        solution: validatedData.solution,
        batch: validatedData.batch,
        rollNumber: validatedData.rollNumber,
        contactNumber: validatedData.contactNumber,
        uniqueness: validatedData.uniqueness,
        marketSize: validatedData.marketSize,
        targetCustomer: validatedData.targetCustomer,
        businessModel: validatedData.businessModel,
        currentStage: validatedData.currentStage,
        techStack: validatedData.techStack,
        competitors: validatedData.competitors,
        websiteUrl: validatedData.websiteUrl,
        demoUrl: validatedData.demoUrl,
        pitchDeckUrl: validatedData.pitchDeckUrl,
        otherLinks: validatedData.otherLinks,
        additionalInfo: validatedData.additionalInfo,
        specificGuidance: validatedData.specificGuidance,
        teamMembers: {
          create: validatedData.teamMembers || [],
        },
      },
      include: {
        teamMembers: true,
      },
    });

    return reply.code(201).send({
      success: true,
      data: submission,
      message: 'Submission created successfully',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.code(400).send({
        success: false,
        errors: error.errors,
      });
    }

    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return reply.code(409).send({
        success: false,
        message: 'Email already exists',
      });
    }

    console.error('Error creating submission:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create submission',
    });
  }
};

export const getAllSubmissions = async (
  request: FastifyRequest<{
    Querystring: {
      page?: string;
      limit?: string;
      stage?: string;
      email?: string;
    };
  }>,
  reply: FastifyReply
) => {
  try {
    const page = Math.max(1, parseInt(request.query.page || '1'));
    const limit = Math.min(100, parseInt(request.query.limit || '10'));
    const skip = (page - 1) * limit;

    // Build filter
    const where: any = {};
    if (request.query.stage) {
      where.currentStage = request.query.stage;
    }
    if (request.query.email) {
      where.email = {
        contains: request.query.email,
        mode: 'insensitive',
      };
    }

    const [submissions, total] = await Promise.all([
      prisma.submission.findMany({
        where,
        skip,
        take: limit,
        include: {
          teamMembers: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.submission.count({ where }),
    ]);

    return reply.send({
      success: true,
      data: submissions,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch submissions',
    });
  }
};

/**
 * Get a single submission by ID
 */
export const getSubmissionById = async (
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
) => {
  try {
    const submission = await prisma.submission.findUnique({
      where: { id: request.params.id },
      include: {
        teamMembers: true,
      },
    });

    if (!submission) {
      return reply.code(404).send({
        success: false,
        message: 'Submission not found',
      });
    }

    return reply.send({
      success: true,
      data: submission,
    });
  } catch (error) {
    console.error('Error fetching submission:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch submission',
    });
  }
};

export const getSubmissionsByEmail = async (
  request: FastifyRequest<{
    Params: { email: string };
  }>,
  reply: FastifyReply
) => {
  try {
    const submissions = await prisma.submission.findMany({
      where: {
        email: request.params.email,
      },
      include: {
        teamMembers: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return reply.send({
      success: true,
      data: submissions,
      count: submissions.length,
    });
  } catch (error) {
    console.error('Error fetching submissions by email:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch submissions',
    });
  }
};

export const updateSubmission = async (
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
) => {
  try {
    const validatedData = submissionSchema.partial().parse(request.body);

    const submission = await prisma.submission.update({
      where: { id: request.params.id },
      data: validatedData,
      include: {
        teamMembers: true,
      },
    });

    return reply.send({
      success: true,
      data: submission,
      message: 'Submission updated successfully',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.code(400).send({
        success: false,
        errors: error.errors,
      });
    }

    if (error instanceof Error && error.message.includes('not found')) {
      return reply.code(404).send({
        success: false,
        message: 'Submission not found',
      });
    }

    console.error('Error updating submission:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update submission',
    });
  }
};


export const deleteSubmission = async (
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
) => {
  try {
    await prisma.submission.delete({
      where: { id: request.params.id },
    });

    return reply.send({
      success: true,
      message: 'Submission deleted successfully',
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      return reply.code(404).send({
        success: false,
        message: 'Submission not found',
      });
    }

    console.error('Error deleting submission:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete submission',
    });
  }
};


export const getSubmissionStats = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const total = await prisma.submission.count();

    const byStage = await prisma.submission.groupBy({
      by: ['currentStage'],
      _count: true,
    });

    const stats = {
      total,
      byStage: byStage.map((s) => ({
        stage: s.currentStage,
        count: s._count,
      })),
    };

    return reply.send({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch statistics',
    });
  }
};