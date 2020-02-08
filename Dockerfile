FROM node:10.19.0-alpine3.11

# COPY angular.json package-lock.json package.json tsconfig.json tslint.json /carpooly-ui/
# COPY src /carpooly-ui/src
COPY . /carpooly-ui
RUN cd ./carpooly-ui && apk add bash && yarn install

WORKDIR /carpooly-ui
ENTRYPOINT [ "yarn", "docker" ]
EXPOSE 4200