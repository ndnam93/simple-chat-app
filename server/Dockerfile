FROM node:alpine

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

EXPOSE 3001

USER node

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

CMD ["yarn", "dev", "-L"]

