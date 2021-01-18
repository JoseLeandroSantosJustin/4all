FROM node:14

WORKDIR /node

COPY package*.json ./
COPY . ./
COPY --chown=node:node . .

RUN chown -R node:node /node
RUN npm install
RUN npm run build

USER node

EXPOSE 8081

CMD [ "node", "dist/server.js" ]