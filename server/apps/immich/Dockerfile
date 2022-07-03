FROM node:16-alpine3.14 as core

ARG DEBIAN_FRONTEND=noninteractive

WORKDIR /usr/src/app

RUN apk add --update-cache build-base python3 libheif vips-dev vips ffmpeg

COPY ./dist/immich/. .

RUN npm install

CMD [ "node", "main.js" ]
