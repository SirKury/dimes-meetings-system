FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable

FROM base AS deps
COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/api/package.json apps/api/package.json
COPY prisma/package.json prisma/package.json
RUN pnpm install --filter @dimes/api... --filter @dimes/prisma... --ignore-scripts

FROM deps AS build
COPY . .
RUN pnpm --filter @dimes/api build

FROM node:20-alpine AS runtime
WORKDIR /app
RUN corepack enable
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=build /app/apps/api/package.json ./apps/api/package.json
COPY --from=build /app/prisma ./prisma
EXPOSE 3001
CMD ["node", "apps/api/dist/main.js"]
