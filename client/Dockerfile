# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install npm and dependencies
RUN npm install

# Install Material-UI library
RUN npm install @mui/material @emotion/react @emotion/styled

# Copy the rest of the project files to the container
COPY . .

# Set environment variables
ENV NODE_ENV=production

# Expose the port on which your application listens
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]
