FROM node:18

WORKDIR /user/srs/app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p uploads

EXPOSE 3002

CMD [ "node", "app.js", "--port", "3002" ]
