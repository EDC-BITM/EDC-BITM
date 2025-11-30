# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN yarn prisma generate

# Copy source code
COPY . .

# Build TypeScript
RUN yarn build

# Production stage
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --production --frozen-lockfile

# Copy prisma schema and generate client
COPY prisma ./prisma/
RUN yarn prisma generate

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 8080

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["node", "dist/index.js"]
