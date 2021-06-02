FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn 

COPY . .

EXPOSE 5001
CMD [ "node", "index.js" ]