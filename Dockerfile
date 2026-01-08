FROM oven/bun:latest AS base

WORKDIR /app

FROM base AS deps

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM base AS runner
WORKDIR /app

COPY --from=builder /app/ ./
COPY package.json ./
EXPOSE 3000

CMD ["bun", "run", ".output/server/index.mjs"]