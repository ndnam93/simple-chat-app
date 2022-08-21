FROM node:lts-alpine as common-build-stage

WORKDIR /app

EXPOSE 3000

COPY package.json yarn.lock ./

RUN yarn

COPY . .

CMD [ "yarn", "dev" ]




