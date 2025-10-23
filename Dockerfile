# Stage 1: Build the React application
FROM node:18-alpine AS build
WORKDIR /app
# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Build the application for production
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:1.25-alpine
# Copy the built static files from the 'build' stage to Nginx's web root directory
# IMPORTANT: If 'npm run build' creates a 'build' folder, change '/app/dist' to '/app/build' below
COPY --from=build /app/dist /usr/share/nginx/html
# Copy a custom Nginx configuration file (Recommended for React Router)
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port 80 (default HTTP port for Nginx)
EXPOSE 80
# Command to start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]