FROM node:lts AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable

# Copy the Nginx configuration file
COPY --from=builder /app/.nginx/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

# Remove the default Nginx static files
RUN rm -rf ./*

COPY --from=builder /app/dist . 

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
