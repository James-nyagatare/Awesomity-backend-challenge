FROM node:12.20

ARG PORT

WORKDIR /usr/src

COPY package*.json ./

RUN npm install 

COPY . .

COPY .env.example .env

EXPOSE $PORT

CMD ["npm", "run", "docker:start"]