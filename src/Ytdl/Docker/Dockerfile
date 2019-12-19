FROM php:5.6-apache
EXPOSE 80
RUN apt-get update && apt-get install -y build-essential
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y npm ffmpeg redis-tools
WORKDIR /var/www/html
COPY ["Ytdl/Server", "/var/www/html/"]
WORKDIR /var/www/html/api/ytdl
RUN npm i
RUN cp -r ./node_modules/m3u8stream/dist ./node_modules/m3u8stream/lib
RUN chown www-data:www-data ./files
# RUN npm install
