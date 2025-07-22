ARG NODE_VERSION=lts-alpine

# -------- Base Stage --------
FROM node:${NODE_VERSION} AS base
WORKDIR /app


# --- Build stage ---
FROM base AS build

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --only=production

COPY . .

RUN npm run build

# -------- Development Stage --------
FROM base AS dev
ENV NODE_ENV=development
COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev"]


# --- Test stage ---
FROM development AS test

CMD ["npm", "run", "test"] 