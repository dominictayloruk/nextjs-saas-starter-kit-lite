# Docker Deployment Guide

This guide explains how to build and deploy the Next.js SaaS Starter Kit using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose (optional, for local development)
- Environment variables configured

## Building the Docker Image

### Local Build

```bash
docker build -t nextjs-saas-starter:latest .
```

### Build with BuildKit (Recommended)

```bash
DOCKER_BUILDKIT=1 docker build -t nextjs-saas-starter:latest .
```

## Running the Container

### Basic Run

```bash
docker run -p 3000:3000 nextjs-saas-starter:latest
```

### With Environment Variables

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_supabase_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key \
  -e SUPABASE_SERVICE_ROLE_KEY=your_service_role_key \
  nextjs-saas-starter:latest
```

### Using Environment File

```bash
docker run -p 3000:3000 --env-file apps/web/.env.production nextjs-saas-starter:latest
```

## GitLab CI/CD

The `.gitlab-ci.yml` file is configured to:

1. **Build Stage**: Compile the Next.js application
   - Uses Node.js 24 Alpine image
   - Installs dependencies with pnpm
   - Builds with increased memory limit (4GB)
   - Creates artifacts for the `.next` directory

2. **Test Stage**: Validates the build output
   - Checks if `.next` directory exists and is not empty

3. **Deploy Stage**: (Configure as needed for your deployment target)

### Environment Variables in GitLab CI

Add these variables in your GitLab project settings (Settings > CI/CD > Variables):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- Any other required environment variables

## Troubleshooting

### Build Fails with "Next.js build worker exited with code: 1"

This usually indicates one of the following issues:

1. **Out of Memory**: Increase the Node.js memory limit
   ```bash
   NODE_OPTIONS="--max-old-space-size=4096" pnpm run build
   ```

2. **Missing Environment Variables**: Ensure all required env vars are set
   - Check `apps/web/.env.production` for required variables
   - Create `.env.local` if needed

3. **Missing Dependencies**: Install build dependencies
   ```bash
   apk add --no-cache git python3 make g++
   ```

### Container Fails to Start

1. Check logs:
   ```bash
   docker logs <container_id>
   ```

2. Verify environment variables are set correctly

3. Ensure the port 3000 is not already in use

### Build is Slow

1. Use BuildKit for faster builds:
   ```bash
   DOCKER_BUILDKIT=1 docker build .
   ```

2. Use multi-stage builds (already configured in Dockerfile)

3. Leverage Docker layer caching

## Production Deployment

### Using Docker Compose

Create a `docker-compose.yml`:

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - apps/web/.env.production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### Kubernetes Deployment

See the `k8s/` directory (if available) for Kubernetes manifests.

### Cloud Platforms

- **AWS ECS/Fargate**: Use the Dockerfile with ECS task definitions
- **Google Cloud Run**: Deploy directly from the Dockerfile
- **Azure Container Instances**: Use the built image
- **DigitalOcean App Platform**: Connect to your Git repository

## Performance Optimization

1. **Multi-stage builds**: Already implemented to reduce image size
2. **Layer caching**: Dependencies are cached separately from source code
3. **Standalone output**: Next.js standalone mode reduces deployment size
4. **Non-root user**: Security best practice implemented

## Security Considerations

- Never commit `.env` files with secrets
- Use Docker secrets or environment variables for sensitive data
- Run containers as non-root user (already configured)
- Regularly update base images for security patches
- Use specific version tags instead of `latest` in production

## Additional Resources

- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [GitLab CI/CD Documentation](https://docs.gitlab.com/ee/ci/)
