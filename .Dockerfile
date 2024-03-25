FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app  

# Copy package.json and package-lock.json separately to leverage Docker cache
COPY package*.json ./

RUN npm install

# Add the following lines
ENV CI=true
ENV WDS_SOCKET_PORT=0

COPY . .

# # Copy the service account key into the container
# COPY ./credentials/service-account-key.json /usr/src/app/credentials/service-account-key.json

# Set the environment variable to point to the service account key
ENV GOOGLE_APPLICATION_CREDENTIALS /usr/src/app/credentials/service-account-key.json \ 
    PORT=8001

CMD ["npm", "start"]

EXPOSE 8000
