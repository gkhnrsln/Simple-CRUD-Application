FROM node:22 AS build
WORKDIR /usr/src/app
COPY package*.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:alpine
LABEL maintainer="gkhnrsln"
COPY nginx/default.conf /etc/nginx/conf.d
COPY --from=build /usr/src/app/dist/simple-crud-application/browser /usr/share/nginx/html
