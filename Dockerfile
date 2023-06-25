FROM node:latest

WORKDIR /usr/src/app

COPY client/package*.json ./client/
WORKDIR /usr/src/app/client
RUN npm install

WORKDIR /usr/src/app

COPY server/package*.json ./server/
WORKDIR /usr/src/app/server
RUN npm install

WORKDIR /usr/src/app

COPY . .

EXPOSE 8000

CMD ["npm", "run", "server"]