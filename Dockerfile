# Use the official Node.js image as the base image
FROM node:alpine3.19

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 80 to the outside world
EXPOSE 3000

# Start nginx server
CMD ["npm", "start"]
