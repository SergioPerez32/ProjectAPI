# Use the official Node.js 14 image as a base
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build your TypeScript code
RUN npm run build

# Expose the port your app runs on
EXPOSE 4000

# Command to run your app
CMD ["node", "dist/app.js"]