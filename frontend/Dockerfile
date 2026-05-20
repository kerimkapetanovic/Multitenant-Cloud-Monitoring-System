# 1. Koristimo zvaničnu Node.js sliku
FROM node:20-alpine

WORKDIR /app

COPY package*.json /app/
RUN npm install

RUN npm install -g @angular/cli

COPY . /app/

CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]