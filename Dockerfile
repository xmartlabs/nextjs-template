# ---- Base ----

ARG NODE_VERSION=20.9.0

FROM node:${NODE_VERSION} AS base
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
# For -alpine to work , you will have to have python installed before everything else,
# and that is why we have that extra line of RUN apk add — no-cache g++ make py3-pip libc6-compat.
# RUN apk add --no-cache g++ make py3-pip libc6-compat rust cargo
# RUN apk add --no-cache libc6-compat

# ---- Dependencies ----
FROM base AS deps

COPY package*.json ./
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm ci && npm cache clean --force; \
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

# FROM base AS runner
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app

# Inherits WORKDIR from base
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --chown=nextjs --from=build /app/next.config.js ./
COPY --chown=nextjs --from=build /app/public ./public
COPY --chown=nextjs --from=build /app/.next ./.next
COPY --chown=nextjs --from=deps /app/node_modules ./node_modules
COPY --chown=nextjs --from=build /app/package*.json ./


EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1
CMD ["npm", "run", "start"]

HEALTHCHECK --interval=5s --timeout=5s --retries=3 \
    CMD curl --fail http://localhost:3000 || exit 1
