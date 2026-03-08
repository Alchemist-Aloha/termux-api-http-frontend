# Build stage
FROM node:20-alpine as build-stage
WORKDIR /app

# Define build arguments
ARG VITE_API_URL
ARG VITE_API_KEY

# Set environment variables for the build process
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_KEY=$VITE_API_KEY

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Copy custom nginx config if needed, but default is fine for simple SPAs
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
