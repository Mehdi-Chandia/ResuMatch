# INSTALLING DEPENDENCIES

FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm install

# STAGE 2 BUILD THE NEXT JS APP

FROM node:20-alpine AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build

# STAGE 3 RUN THE APP

FROM node:20-alpine AS runner

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]