import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const teamMemberSchema = z.object({
  name: z.string().min(1, 'Team member name required'),
  email: z.email('Valid email required').optional(),
  contactNumber: z.string().optional(),
  batch: z.string().optional(),
  rollNumber: z.string().optional(),
  role: z.string().optional(),
});

const submissionSchema = z.object({
  // Required fields
  name: z.string().min(1, 'Name required'),
  email: z.email('Valid email required'),
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
  websiteUrl: z.url().optional().nullable(),
  demoUrl: z.url().optional().nullable(),
  pitchDeckUrl: z.url().optional().nullable(),
  otherLinks: z.string().optional().nullable(),
  additionalInfo: z.string().optional().nullable(),
  specificGuidance: z.string().optional().nullable(),

 
  teamMembers: z.array(teamMemberSchema).min(1, 'At least one team member required'),
});


export const createSubmission = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    // Data is already validated by middleware, so we can use it directly
    const validatedData = request.body as z.infer<typeof submissionSchema>;

    const submission = await prisma.submission.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        title: validatedData.title,
        oneLiner: validatedData.oneLiner,
        problemStatement: validatedData.problemStatement,
        solution: validatedData.solution,
        batch: validatedData.batch ?? null,
        rollNumber: validatedData.rollNumber ?? null,
        contactNumber: validatedData.contactNumber ?? null,
        uniqueness: validatedData.uniqueness ?? null,
        marketSize: validatedData.marketSize ?? null,
        targetCustomer: validatedData.targetCustomer ?? null,
        businessModel: validatedData.businessModel ?? null,
        currentStage: validatedData.currentStage,
        techStack: validatedData.techStack ?? null,
        competitors: validatedData.competitors ?? null,
        websiteUrl: validatedData.websiteUrl ?? null,
        demoUrl: validatedData.demoUrl ?? null,
        pitchDeckUrl: validatedData.pitchDeckUrl ?? null,
        otherLinks: validatedData.otherLinks ?? null,
        additionalInfo: validatedData.additionalInfo ?? null,
        specificGuidance: validatedData.specificGuidance ?? null,
        teamMembers: {
          create: validatedData.teamMembers.map((member) => ({
            ...member,
            email: member.email ?? null,
            contactNumber: member.contactNumber ?? null,
            batch: member.batch ?? null,
            rollNumber: member.rollNumber ?? null,
            role: member.role ?? null,
          })),
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
    // Handle Prisma errors
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        return reply.code(409).send({
          success: false,
          message: 'A submission with this email already exists',
        });
      }
    }

    // Log and return generic error
    console.error('Error creating submission:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create submission. Please try again.',
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
      message: 'Failed to fetch submissions. Please try again.',
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
      message: 'Failed to fetch submission. Please try again.',
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
      message: 'Failed to fetch submissions. Please try again.',
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
    // Data is already validated by middleware
    const validatedData = request.body as Partial<z.infer<typeof submissionSchema>>;

    // remove undefined values to avoid typeScript strict optional issues
    const updateData = Object.fromEntries(
      Object.entries(validatedData)
        .filter(([key, value]) => value !== undefined && key !== 'teamMembers')
        .map(([key, value]) => [key, value ?? null])
    );

    const submission = await prisma.submission.update({
      where: { id: request.params.id },
      data: updateData,
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
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return reply.code(404).send({
        success: false,
        message: 'Submission not found',
      });
    }

    console.error('Error updating submission:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update submission. Please try again.',
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
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return reply.code(404).send({
        success: false,
        message: 'Submission not found',
      });
    }

    console.error('Error deleting submission:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete submission. Please try again.',
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

    interface StageCount {
      stage: string;
      count: number;
    }

    interface SubmissionStats {
      total: number;
      byStage: StageCount[];
    }

    interface GroupedStage {
      currentStage: string;
      _count: number;
    }

    const stats: SubmissionStats = {
      total,
      byStage: (byStage as GroupedStage[]).map((s: GroupedStage): StageCount => ({
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
      message: 'Failed to fetch statistics. Please try again.',
    });
  }
};