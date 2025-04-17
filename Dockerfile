FROM node:20-slim

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

RUN chmod 777 /home/node/app
WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 8000

USER node
CMD [ "node", "server.js" ]