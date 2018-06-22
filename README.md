# generator-electron-humble

![alt tag](https://raw.githubusercontent.com/bakharevpavel/generator-electron-humble/master/generators/app/templates/dev/common/icon.png)

Humble electron generator for Yeoman. Electron + Webpack + Angular X/React + Typescript + Less/Sass/Stylus + Pug (Jade)

## Installation

```sh

	$ npm install -g generator-electron-humble

```

## Usage

```sh

	$ yo electron-humble

```

## Npm commands list

```sh

	$ npm start # Launches the app.
	$ npm run start:prod # Same as npm start (expects you to run build:prod at least once).
	$ npm run start:dev # Launches the app in dev mode (expects you to run build:dev separately).
	$ npm run build:prod # Initiates project's rebuild for production.
	$ npm run build:dev # Watches project's folder for changes and launches hot-reload using webpack-dev-server.
	$ npm run-script tslint # Starts code check with tslint.

```

## Structure

Generated project has the following structure:

```sh

	.
	├── ./app # Electron folder.
	│   ├── ./app/app.js
	│   ├── ./app/package.json
	│   └── ./app/res # Resources folder. Webpack sends processed files here.
	│       ├── ./app/res/app.css
	│       ├── ./app/res/app.css.map
	│       ├── ./app/res/app.js
	│       ├── ./app/res/app.js.map
	│       ├── ./app/res/img
	│       │   └── ./app/res/img/icon.png
	│       ├── ./app/res/index.html
	│       ├── ./app/res/polyfills.js
	│       ├── ./app/res/polyfills.js.map
	│       ├── ./app/res/vendor.js
	│       └── ./app/res/vendor.js.map
	├── ./dev # Development folder. Stores Angular2 project with typescript, jade and less/sass/stylus files.
	│   ├── ./dev/app
	│   │   ├── ./dev/app/app.component.jade
	│   │   ├── ./dev/app/app.component.less
	│   │   ├── ./dev/app/app.component.ts
	│   │   ├── ./dev/app/app.module.ts
	│   │   ├── ./dev/app/app.routing.ts
	│   │   └── ./dev/app/home
	│   │       ├── ./dev/app/home/home.component.jade
	│   │       ├── ./dev/app/home/home.component.ts
	│   │       └── ./dev/app/home/icon.png
	│   ├── ./dev/index.jade
	│   ├── ./dev/main.ts
	│   ├── ./dev/polyfills.ts
	│   └── ./dev/vendor.ts
	├── ./package.json
	├── ./tsconfig.json
	├── ./tslint.json
	└── ./webpack.config.js

```
