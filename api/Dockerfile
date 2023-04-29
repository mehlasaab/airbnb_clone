FROM node:17-alpine

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install
COPY . .

EXPOSE 4001
CMD ["nodemon", "Index.js"]
