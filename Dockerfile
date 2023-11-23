
# ---- base ----
FROM node:20.9.0-alpine AS base
WORKDIR /app
# For -alpine to work , you will have to have python installed before everything else,
# and that is why we have that extra line of RUN apk add — no-cache g++ make py3-pip libc6-compat.
# RUN apk add --no-cache g++ make py3-pip libc6-compat
RUN apk add --no-cache libc6-compat

# ---- Dependencies ----
FROM base AS deps

COPY package*.json ./
RUN npm ci


# ---- Builder ----

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- Runner ----

FROM base AS runner
# Inherits WORKDIR from base
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --chown=nextjs --from=build /app/next.config.js ./
COPY --chown=nextjs --from=build /app/public ./public
COPY --chown=nextjs --from=build /app/public ./.next/standalone/public
COPY --chown=nextjs --from=build /app/.next ./.next


EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1
CMD ["npm", "run", "start"]

HEALTHCHECK --interval=5s --timeout=5s --retries=3 \
    CMD curl --fail http://localhost:3000 || exit 1
