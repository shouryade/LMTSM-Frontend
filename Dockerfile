FROM node:20.3.1-bullseye-slim AS build-deps

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install


COPY . /usr/src/app/


# Stage 2 - the production environment

FROM nginx:1.12-alpine

COPY ./nginx/frontend.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-deps /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]