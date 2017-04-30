# generator-electron-humble

![alt tag](https://raw.githubusercontent.com/bakharevpavel/generator-electron-humble/master/generators/app/templates/dev/app/home/icon.png)

Humble electron generator for Yeoman. Electron + Webpack + Angular v2 + Typescript + Less/Sass/Stylus + Pug (Jade)

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

	npm start # Launches the app.
	npm run-script tslint # Starts code check with tslint.
	npm run-script webpack # Initiates webpack rebuild of the project.
	npm run watch # Watches changes in dev folder using webpack-dev-server.

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