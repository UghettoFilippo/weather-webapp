FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY ./src ./src
COPY ./public ./public
COPY ./templates ./templates

RUN npm install 
   

EXPOSE 3000

CMD [ "node", "src/app.js" ]