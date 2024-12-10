FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache bash


RUN npm install

COPY . .

COPY ./scripts/wait-for-it.sh /usr/local/bin/wait-for-it.sh

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start:dev"]
