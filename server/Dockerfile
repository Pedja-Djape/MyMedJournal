FROM node:lts-alpine3.18

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g nodemon
RUN npm install --silent

COPY . . 

EXPOSE 8080

CMD ["nodemon"]
