FROM node:16

WORKDIR /app

RUN apt-get update && \
    apt-get install -y wget && \
    wget -O - https://github.com/jwilder/dockerize/releases/download/v0.7.0/dockerize-linux-amd64-v0.7.0.tar.gz | tar xzf - -C /usr/local/bin && \
    apt-get autoremove -yqq --purge wget && \
    rm -rf /var/lib/apt/lists/*

COPY . .

RUN npm install

EXPOSE 4000

ENTRYPOINT ["tail", "-f", "/dev/null"]

