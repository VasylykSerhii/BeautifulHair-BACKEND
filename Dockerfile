FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn 

COPY . .

RUN yarn build

EXPOSE 5000

CMD [ "node", "-r", "dotenv/config", "-r", "module-alias/register", "build/index.js" ]