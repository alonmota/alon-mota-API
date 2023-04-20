FROM node:alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm i --no-progress --no-optional --silent

ARG APP_PORT=3000

EXPOSE ${APP_PORT}
