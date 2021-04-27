FROM node:14

WORKDIR /build/app

COPY package.json /build/app

RUN npm install

COPY . /build/app

EXPOSE 8081

CMD npm run build