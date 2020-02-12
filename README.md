# Carpooly

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

## Development server

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Build and run OSMR server
```bash
docker build -t osrm-carpooly osrm
docker run -p 5000:5000 osrm-carpooly
```

## Build and run Carpooly-UI
```bash
docker build -t carpooly-ui .
docker run -it -p 4200:4200 carpooly-ui
```