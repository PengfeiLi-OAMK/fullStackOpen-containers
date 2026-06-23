FROM node:24 AS test-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run test:run

FROM node:24 AS build-stage
WORKDIR /usr/src/app

COPY --from=test-stage /usr/src/app /usr/src/app

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN npm run build

# FROM nginx:1.29-alpine
FROM nginxinc/nginx-unprivileged:alpine
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html