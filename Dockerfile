FROM node:12.18.2-alpine3.12

WORKDIR /api

COPY package*.json /api/

RUN npm install

COPY . /api/

EXPOSE 8000

CMD [ "node", "index.js" ]


