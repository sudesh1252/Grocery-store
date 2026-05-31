# Use official Node.js runtime
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm config set strict-ssl false && \
    npm config set registry http://registry.npmjs.org/ && \
    npm install --production

# Copy application code
COPY . .

# Expose port
EXPOSE 5000

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["node", "src/server.js"]
