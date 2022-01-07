FROM node:alpine

WORKDIR /app

ARG NODE_ENV=production
COPY package.json yarn.lock ./
RUN yarn install
COPY index.js ./

CMD yarn start
