
# Stage 1
FROM node:12.2.0-alpine AS react-build
WORKDIR /app
COPY . ./
RUN npm ci --silent
RUN npm run-script build

# Stage 2 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html

EXPOSE 80

# Copy .env.template for parse env vars into container
WORKDIR /usr/share/nginx/html
COPY ./env.template.js .

# Add bash
RUN apk add --no-cache bash

# Start Nginx server after parse env vars 
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js && exec nginx -g 'daemon off;'"]