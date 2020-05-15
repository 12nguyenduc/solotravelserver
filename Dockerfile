FROM node:10
WORKDIR /app

ENV NODE_ENV="production"

COPY package*.json ./

RUN npm install


COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]


