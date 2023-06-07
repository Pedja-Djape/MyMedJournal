FROM node:lts-alpine3.18

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

COPY . . 

EXPOSE 9000

CMD ["npm", "start"]
