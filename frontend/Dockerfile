FROM node:16.17.0-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn install && yarn build

#---

FROM nginx:alpine
COPY --from=builder /app/build/ /var/www
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80