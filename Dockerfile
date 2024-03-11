# Use the official Node.js 18 image as a base
FROM node:18-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy the dependency management files to the /app directory
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application files to the /app directory
COPY . .
COPY .env.sample .env

# Expose port 3000 for access to your application
EXPOSE 3000

# The command to run the application when the container starts
CMD ["pnpm", "start:dev"]