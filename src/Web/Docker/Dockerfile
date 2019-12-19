FROM nginx:1.17.1-alpine AS base
WORKDIR /app
EXPOSE 80
COPY ["Web/nginx.conf", "/etc/nginx/nginx.conf"]

FROM node:12.6.0-alpine as build
WORKDIR /src
COPY ["Web/Client", "Client/"]
WORKDIR /src/Client
RUN npm i
RUN npm run-script build

FROM base AS final
WORKDIR /app
COPY --from=build /src/Client/dist/qms /app/wwwroot
