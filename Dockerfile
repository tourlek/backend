FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY .env .env

COPY ./src ./src

EXPOSE 8080

CMD [ "npx", "nodemon", "src/index.js" ]
