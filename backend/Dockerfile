# OS and run time
FROM node:18    

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies      --- this when build the image
RUN npm install --production

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port the app runs on (for example, 3000)
EXPOSE 3000

# Define the command to start the app       -- this command runs when container starts
CMD [ "npm", "start" ]
