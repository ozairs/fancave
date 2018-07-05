FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle client
RUN mkdir -p /usr/src/app/client/fancave/www
COPY client/fancave/www /usr/src/app/client/fancave/www

# Bundle server
RUN mkdir -p /usr/src/app/common/models
COPY common/models /usr/src/app/common/models

RUN mkdir -p /usr/src/app/server
RUN mkdir -p /usr/src/app/server/boot
RUN mkdir -p /usr/src/app/server/sample-data

COPY server /usr/src/app/server
COPY server/boot /usr/src/app/server/boot
COPY server/sample-data /usr/src/app/server/sample-data

COPY package.json /usr/src/app/
COPY LICENSES /usr/src/app/

# Install dependent modules
RUN npm install

# Expose inter-container port
EXPOSE 3443

# Start the node server
CMD [ "node", "server/server.js"]