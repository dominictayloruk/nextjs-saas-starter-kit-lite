# syntax=docker/dockerfile:1

# Base stage with Node.js and pnpm
FROM yobasystems/alpine-nodejs:min AS base
RUN apk add --no-cache libc6-compat git python3 make g++
RUN corepack enable && corepack prepare pnpm@10.20.0 --activate

# Dependencies stage
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY apps/e2e/package.json ./apps/e2e/
COPY packages/i18n/package.json ./packages/i18n/
COPY packages/next/package.json ./packages/next/
COPY packages/shared/package.json ./packages/shared/
COPY packages/supabase/package.json ./packages/supabase/
COPY packages/ui/package.json ./packages/ui/
COPY packages/features/accounts/package.json ./packages/features/accounts/
COPY packages/features/auth/package.json ./packages/features/auth/
COPY tooling/eslint/package.json ./tooling/eslint/
COPY tooling/prettier/package.json ./tooling/prettier/
COPY tooling/scripts/package.json ./tooling/scripts/
COPY tooling/tailwind/package.json ./tooling/tailwind/
COPY tooling/typescript/package.json ./tooling/typescript/

# Copy scripts source files needed for preinstall hook
COPY tooling/scripts/src ./tooling/scripts/src/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Builder stage
FROM base AS builder
WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source files (excluding node_modules which are in .dockerignore)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps ./apps
COPY packages ./packages
COPY tooling ./tooling
COPY turbo ./turbo

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
