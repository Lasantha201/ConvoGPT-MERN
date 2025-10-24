# Dockerfile for the backend API service
FROM node:20.14.0

# Install nodemon globally for hot reload
RUN npm install -g nodemon

# Set working directory inside the container
WORKDIR /app

# Copy all source files
COPY . .

# Install dependencies
RUN npm install

# Expose container port 3000 internally (your backend uses 3000)
EXPOSE 3000

# Start the backend using npm start (should use nodemon)
CMD ["npm", "run", "start"]
