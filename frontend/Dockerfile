FROM node:lts AS builder

WORKDIR /app

COPY .env ./
COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM nginx:stable

# Copy the Nginx configuration file
COPY --from=builder /app/.nginx/nginx-selfsigned.crt /etc/nginx/ssl/nginx-selfsigned.crt
COPY --from=builder /app/.nginx/nginx-selfsigned.key /etc/nginx/ssl/nginx-selfsigned.key
COPY --from=builder /app/.nginx/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

# Remove the default Nginx static files
RUN rm -rf ./*

COPY --from=builder /app/dist . 

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
