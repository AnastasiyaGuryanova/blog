FROM node:18

WORKDIR /user/srs/app

COPY . .

WORKDIR /user/srs/app/frontend
RUN npm i
RUN npm run build

WORKDIR /user/srs/app/backend
RUN npm i

EXPOSE 3001

CMD [ "node", "app.js" ]
