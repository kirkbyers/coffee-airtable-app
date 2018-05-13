FROM node:8.7.0

ENV HOME=/app NPM_CONFIG_LOGLEVEL=warn 

COPY . package.json package-lock.json $HOME/

WORKDIR $HOME/

RUN npm i

ENTRYPOINT npm run dist
