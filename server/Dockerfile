FROM node:18.12.1-alpine

WORKDIR /app

COPY . .

COPY package*.json ./

RUN npm install

RUN npm run build