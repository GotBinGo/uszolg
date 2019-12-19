FROM node:12.6.0-alpine
EXPOSE 80
WORKDIR /app
COPY ["Todos/Server", "Server/"]
WORKDIR /app/Server
RUN npm i
CMD ["npm", "run-script", "dev"]
