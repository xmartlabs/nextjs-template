# ---- Base ----

ARG NODE_VERSION=20.9.0

FROM node:${NODE_VERSION} AS base
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

# ---- Dependencies ----
FROM base AS deps

COPY package*.json ./

RUN if [ "$NODE_ENV" = "development" ]; then \
        npm install; \
    else \
        npm ci --only=production && npm cache clean --force; \
    fi

# ---- Builder ----

FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN if [ "$NODE_ENV" = "production" ]; \
        then npm run build; \
    fi

# ---- Runner ----

FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --chown=nextjs --from=build /app/next.config.js ./
COPY --chown=nextjs --from=build /app/public ./public
COPY --chown=nextjs --from=build /app/.next ./.next
COPY --chown=nextjs --from=deps /app/node_modules ./node_modules
COPY --chown=nextjs --from=build /app/package*.json ./

USER nextjs

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1
CMD ["npm", "run", "start"]

HEALTHCHECK --interval=5s --timeout=5s --retries=3 \
    CMD curl --fail http://localhost:3000 || exit 1
