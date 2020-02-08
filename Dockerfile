FROM node:10.19.0-alpine3.11

# User/Group Id gui app will be executed as default are 99 and 100
ENV USER_ID=99
ENV GROUP_ID=100

# Gui App Name default is "GUI_APPLICATION"
ENV APP_NAME="Audacity"

# Default resolution, change if you like
ENV WIDTH=1280
ENV HEIGHT=720

# COPY angular.json package-lock.json package.json tsconfig.json tslint.json /carpooly-ui/
# COPY src /carpooly-ui/src
COPY . /carpooly-ui
RUN cd ./carpooly-ui && apk add bash && yarn install

WORKDIR /carpooly-ui
ENTRYPOINT [ "yarn", "docker" ]
EXPOSE 4200