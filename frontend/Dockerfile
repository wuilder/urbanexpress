FROM node:alpine as builder

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

#---

FROM nginx:alpine

COPY --from=builder /app/builder/ /var/www
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80