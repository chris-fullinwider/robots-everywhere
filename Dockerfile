FROM node:12 AS builder

WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'