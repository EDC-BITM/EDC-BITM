import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';


const sanitizeObject = (obj: any): any => {
  if (typeof obj === 'string') {
    return DOMPurify.sanitize(obj, { ALLOWED_TAGS: [] });
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item));
  }

  if (obj !== null && typeof obj === 'object') {
    const sanitized: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
    }
    return sanitized;
  }

  return obj;
};

  
export const sanitizeInput = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (request.body && typeof request.body === 'object') {
    request.body = sanitizeObject(request.body);
  }
};

export const teamMemberSchema = z.object({
  name: z
    .string()
    .min(1, 'Team member name is required')
    .max(255, 'Name must be less than 255 characters'),
  email: z
    .string()
    .email('Valid email required')
    .optional()
    .nullable()
    .or(z.literal('')),
  contactNumber: z
    .string()
    .optional()
    .nullable()
    .refine(
      (val) => !val || /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(val),
      'Invalid phone number format'
    ),
  batch: z.string().max(10).optional().nullable(),
  rollNumber: z.string().max(20).optional().nullable(),
  role: z.string().max(50).optional().nullable(),
});

export const submissionSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(255, 'Name must be less than 255 characters'),
  email: z.string().email('Valid email required').toLowerCase(),
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(255, 'Title must be less than 255 characters'),
  oneLiner: z
    .string()
    .min(10, 'One-liner must be at least 10 characters')
    .max(500, 'One-liner must be less than 500 characters'),
  problemStatement: z
    .string()
    .min(20, 'Problem statement must be at least 20 characters')
    .max(2000, 'Problem statement must be less than 2000 characters'),
  solution: z
    .string()
    .min(20, 'Solution must be at least 20 characters')
    .max(2000, 'Solution must be less than 2000 characters'),
  currentStage: z.enum(['IDEA', 'PROTOTYPE', 'EARLY_CUSTOMERS', 'REVENUE'], {
    errorMap: () => ({
      message: 'Current stage must be one of: IDEA, PROTOTYPE, EARLY_CUSTOMERS, REVENUE',
    }),
  }),
 batch: z
    .string()
    .max(10, 'Batch must be less than 10 characters')
    .optional()
    .nullable(),
  rollNumber: z
    .string()
    .max(20, 'Roll number must be less than 20 characters')
    .optional()
    .nullable(),
  contactNumber: z
    .string()
    .optional()
    .nullable()
    .refine(
      (val) =>
        !val || /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(val),
      'Invalid phone number format'
    ),
  uniqueness: z
    .string()
    .max(1000, 'Uniqueness description must be less than 1000 characters')
    .optional()
    .nullable(),
  marketSize: z
    .string()
    .max(1000, 'Market size must be less than 1000 characters')
    .optional()
    .nullable(),
  targetCustomer: z
    .string()
    .max(1000, 'Target customer must be less than 1000 characters')
    .optional()
    .nullable(),
  businessModel: z
    .string()
    .max(1000, 'Business model must be less than 1000 characters')
    .optional()
    .nullable(),
  techStack: z
    .string()
    .max(500, 'Tech stack must be less than 500 characters')
    .optional()
    .nullable(),
  competitors: z
    .string()
    .max(1000, 'Competitors must be less than 1000 characters')
    .optional()
    .nullable(),
  websiteUrl: z
    .string()
    .url('Invalid website URL')
    .optional()
    .nullable()
    .or(z.literal('')),
  demoUrl: z
    .string()
    .url('Invalid demo URL')
    .optional()
    .nullable()
    .or(z.literal('')),
  pitchDeckUrl: z
    .string()
    .url('Invalid pitch deck URL')
    .optional()
    .nullable()
    .or(z.literal('')),
  otherLinks: z
    .string()
    .max(1000, 'Other links must be less than 1000 characters')
    .optional()
    .nullable(),
  additionalInfo: z
    .string()
    .max(2000, 'Additional info must be less than 2000 characters')
    .optional()
    .nullable(),
  specificGuidance: z
    .string()
    .max(2000, 'Specific guidance must be less than 2000 characters')
    .optional()
    .nullable(),

  // Team members
  teamMembers: z.array(teamMemberSchema).optional().default([]),
});


export const validateSubmission = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const validated = submissionSchema.parse(request.body);
    request.body = validated;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.code(400).send({
        success: false,
        message: 'Validation failed',
        errors: error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }
    throw error;
  }
};


export const validateSubmissionUpdate = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const validated = submissionSchema.partial().parse(request.body);
    request.body = validated;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.code(400).send({
        success: false,
        message: 'Validation failed',
        errors: error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }
    throw error;
  }
};

export const handleValidationError = (error: z.ZodError) => {
  return {
    success: false,
    message: 'Validation failed',
    errors: error.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
      code: e.code,
    })),
  };
};


export const handleDatabaseError = (error: Error) => {
  console.error('Database error:', error);

  if (error.message.includes('Unique constraint')) {
    return {
      success: false,
      message: 'Email already exists',
      code: 'UNIQUE_CONSTRAINT',
    };
  }

  if (error.message.includes('not found')) {
    return {
      success: false,
      message: 'Resource not found',
      code: 'NOT_FOUND',
    };
  }

  return {
    success: false,
    message: 'Database error occurred',
    code: 'DATABASE_ERROR',
  };
};



interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const rateLimitStore: RateLimitStore = {};


export const createRateLimiter = (maxRequests: number = 100, windowMs: number = 60000) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const ip = request.ip;
    const now = Date.now();

    if (!rateLimitStore[ip]) {
      rateLimitStore[ip] = {
        count: 1,
        resetTime: now + windowMs,
      };
      return;
    }

    const store = rateLimitStore[ip];

    if (now > store.resetTime) {
      store.count = 1;
      store.resetTime = now + windowMs;
      return;
    }

    store.count++;

    if (store.count > maxRequests) {
      return reply.code(429).send({
        success: false,
        message: 'Too many requests, please try again later',
        retryAfter: Math.ceil((store.resetTime - now) / 1000),
      });
    }
  };
};