# docker rn --rm -it -v $(pwd)/:/app -p 3002:3000 node:18 bash
FROM node:16

WORKDIR /api

ENV DOCKERIZE_VERSION v0.7.0

RUN apt-get update \
    && apt-get install -y wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*

COPY . .

EXPOSE 4000

ENTRYPOINT ["tail", "-f", "/dev/null"]
