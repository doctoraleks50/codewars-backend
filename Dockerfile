FROM node:10-alpine

MAINTAINER Markas Kvitka

WORKDIR /
ADD package.json /
RUN npm install --no-progress && rm -rf /root/.npm /tmp/npm*
RUN npm install -g --no-progress nodemon mocha sequelize-cli@5.5.1
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/latest-stable/community' >> /etc/apk/repositories
RUN apk update
RUN apk add docker-cli