# ---- Deps ----

ARG NODE_VERSION=20.9.0

FROM node:${NODE_VERSION} AS deps
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY package*.json ./

RUN if [ "$NODE_ENV" = "development" ]; then \
        npm install; \
    else \
        npm ci --only=production && npm cache clean --force; \
    fi
COPY . .

RUN if [ "$NODE_ENV" = "production" ]; then \
        npm run build; \
    fi

# ---- Prod Runner ----

FROM node:${NODE_VERSION}-alpine AS prod-runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --chown=nextjs --from=deps /app/next.config.js ./
COPY --chown=nextjs --from=deps /app/public ./public
COPY --chown=nextjs --from=deps /app/.next ./.next
COPY --chown=nextjs --from=deps /app/node_modules ./node_modules
COPY --chown=nextjs --from=deps /app/package*.json ./

USER nextjs

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED=1
CMD ["npm", "run", "start"]

HEALTHCHECK --interval=5s --timeout=5s --retries=3 \
    CMD curl --fail http://localhost:3000 || exit 1


# ---- Dev Runner ----

FROM node:${NODE_VERSION}-alpine AS dev-runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --chown=nextjs --from=deps /app/next.config.js ./
COPY --chown=nextjs --from=deps /app/public ./public
COPY --chown=nextjs --from=deps /app/node_modules ./node_modules
COPY --chown=nextjs --from=deps /app/package*.json ./

USER nextjs

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED=1
CMD ["npm", "run", "dev"]

HEALTHCHECK --interval=5s --timeout=5s --retries=3 \
    CMD curl --fail http://localhost:3000 || exit 1
