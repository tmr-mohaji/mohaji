FROM node:16
WORKDIR /app
COPY . /app
EXPOSE 3000
RUN npm install
RUN npm rebuild node-sass

CMD [ "npm", "start" ]