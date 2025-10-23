# syntax=docker/dockerfile:1

# Base stage with Node.js and pnpm
FROM node:24-alpine AS base
RUN apk add --no-cache libc6-compat git python3 make g++
RUN corepack enable && corepack prepare pnpm@10.19.0 --activate

# Dependencies stage
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/*/package.json ./packages/*/
COPY tooling/*/package.json ./tooling/*/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Builder stage
FROM base AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules

# Copy all source files
COPY . .

# Create production env file if it doesn't exist
RUN if [ ! -f apps/web/.env.local ]; then \
      cp apps/web/.env.production apps/web/.env.local 2>/dev/null || \
      touch apps/web/.env.local; \
    fi

# Build the application with increased memory
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN pnpm run build

# Runner stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/web/server.js"]
