'use strict';
const Generator = require('yeoman-generator');
const yosay = require('yosay');
const path = require('path');
const chalk = require('chalk');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    };

    initializing() {
        this.log(yosay('Yo! Welcome to the humble ' + chalk.blue.bold('electron') + ' generator!'));

        this.sourceRoot(path.join(__dirname, 'templates'));

        this.data = {
            appName: path.basename(process.cwd())
        };
    };

    prompting() {
        let done = this.async();

        let prompts = [{
            type: 'input',
            name: 'appName',
            message: 'What is the name of your application?',
            default: this.data.appName
        }, {
            type: 'list',
            name: 'cssPreprocessor',
            message: 'What css preprocessor would you like to use?',
            choices: [{
                value   : 'Less',
                name    : 'Less',
                checked : true
            }, {
                value   : 'Sass',
                name    : 'Sass',
                checked : false
            }, {
                value   : 'Stylus',
                name    : 'Stylus',
                checked : false
            }]
        }, {
            type: 'list',
            name: 'frontendType',
            message: 'Do you want to use React or Angular X?',
            choices: [{
                value   : 'Angular',
                name    : 'Angular',
                checked : true
            }, {
                value   : 'React',
                name    : 'React',
                checked : false
            }]
        }, {
            when: (response) => {
                if(response.frontendType == 'Angular') {
                    return response.frontendType;
                };
            },
            type: 'confirm',
            name: 'templateEngine',
            message: 'Would you like to use Pug (Jade) template engine?',
            default: true
        }, {
            type: 'confirm',
            name: 'materialDesign',
            message: 'Would you like to use material design?',
            default: true
        }];

        this.prompt(prompts).then(function(answers) {
            this.data.appName = answers.appName;
            this.data.cssPreprocessor = answers.cssPreprocessor;
            this.data.templateEngine = answers.templateEngine;
            this.data.materialDesign = answers.materialDesign;
            this.data.frontendType = answers.frontendType;

            done();
        }.bind(this));
    };

    writing() {
        this.fs.copy(
            this.templatePath('./app'),
            this.destinationPath('./app')
        );

        if(this.data.frontendType == 'Angular') {

            this.fs.copyTpl(
                this.templatePath('./dev/angular/main.ts'),
                this.destinationPath('./dev/main.ts'),
                this.data
            );

            this.fs.copy(
                this.templatePath('./dev/angular/polyfills.ts'),
                this.destinationPath('./dev/polyfills.ts')
            );

            this.fs.copy(
                this.templatePath('./dev/angular/vendor.ts'),
                this.destinationPath('./dev/vendor.ts')
            );

            if(this.data.templateEngine == true) {
                this.fs.copyTpl(
                    this.templatePath('./dev/angular/app/app.component.pug'),
                    this.destinationPath('./dev/app/app.component.pug'),
                    this.data
                );
            } else {
                this.fs.copyTpl(
                    this.templatePath('./dev/angular/app/app.component.html'),
                    this.destinationPath('./dev/app/app.component.html'),
                    this.data
                );
            };

            this.fs.copyTpl(
                this.templatePath('./dev/angular/app/app.component.ts'),
                this.destinationPath('./dev/app/app.component.ts'),
                this.data
            );

            this.fs.copyTpl(
                this.templatePath('./dev/angular/app/app.module.ts'),
                this.destinationPath('./dev/app/app.module.ts'),
                this.data
            );

            this.fs.copy(
                this.templatePath('./dev/angular/app/app.routing.ts'),
                this.destinationPath('./dev/app/app.routing.ts')
            );

            if(this.data.cssPreprocessor == 'Stylus') {
                this.fs.copy(
                    this.templatePath('./dev/common/style.styl'),
                    this.destinationPath('./dev/app/app.component.styl')
                );
            } else if(this.data.cssPreprocessor == 'Less') {
                this.fs.copy(
                    this.templatePath('./dev/common/style.less'),
                    this.destinationPath('./dev/app/app.component.less')
                );
            } else if(this.data.cssPreprocessor == 'Sass') {
                this.fs.copy(
                    this.templatePath('./dev/common/style.scss'),
                    this.destinationPath('./dev/app/app.component.scss')
                );
            };

            if(this.data.templateEngine == true) {
                this.fs.copyTpl(
                    this.templatePath('./dev/angular/app/home/home.component.pug'),
                    this.destinationPath('./dev/app/home/home.component.pug'),
                    this.data
                );
            } else {
                this.fs.copyTpl(
                    this.templatePath('./dev/angular/app/home/home.component.html'),
                    this.destinationPath('./dev/app/home/home.component.html'),
                    this.data
                );
            };

            this.fs.copyTpl(
                this.templatePath('./dev/angular/app/home/home.component.ts'),
                this.destinationPath('./dev/app/home/home.component.ts'),
                this.data
            );

            this.fs.copy(
                this.templatePath('./dev/common/icon.png'),
                this.destinationPath('./dev/app/home/icon.png')
            );
        } else if(this.data.frontendType == 'React') {

            if(this.data.cssPreprocessor == 'Stylus') {
                this.fs.copy(
                    this.templatePath('./dev/common/style.styl'),
                    this.destinationPath('./dev/style.styl')
                );
            } else if(this.data.cssPreprocessor == 'Less') {
                this.fs.copy(
                    this.templatePath('./dev/common/style.less'),
                    this.destinationPath('./dev/style.less')
                );
            } else if(this.data.cssPreprocessor == 'Sass') {
                this.fs.copy(
                    this.templatePath('./dev/common/style.scss'),
                    this.destinationPath('./dev/style.scss')
                );
            };

            this.fs.copyTpl(
                this.templatePath('./dev/react/App.tsx'),
                this.destinationPath('./dev/App.tsx'),
                this.data
            );

            this.fs.copyTpl(
                this.templatePath('./dev/react/home/Home.tsx'),
                this.destinationPath('./dev/home/Home.tsx'),
                this.data
            );

            this.fs.copy(
                this.templatePath('./dev/common/icon.png'),
                this.destinationPath('./dev/home/icon.png')
            );
        };

        if(this.data.templateEngine && this.data.frontendType == 'Angular') {
            this.fs.copy(
                this.templatePath('./dev/angular/index.pug'),
                this.destinationPath('./dev/index.pug')
            );
        } else {
            this.fs.copy(
                this.templatePath('./dev/common/index.html'),
                this.destinationPath('./dev/index.html')
            );
        };

        this.fs.copyTpl(
            this.templatePath('./tsconfig.json'),
            this.destinationPath('./tsconfig.json'),
            this.data
        );

        this.fs.copy(
            this.templatePath('./tslint.json'),
            this.destinationPath('./tslint.json')
        );

        this.fs.copyTpl(
            this.templatePath('./webpack.config.js'),
            this.destinationPath('./webpack.config.js'),
            this.data
        );

        this.fs.copy(
            this.templatePath('./gitignore'),
            this.destinationPath('./.gitignore')
        );

        this.fs.copyTpl(
            this.templatePath('./app/package.json'),
            this.destinationPath('./app/package.json'),
            this.data
        );

        this.fs.copyTpl(
            this.templatePath('./package.json'),
            this.destinationPath('./package.json'),
            this.data
        );
    };

    install() {
        this.installDependencies({
            bower: false,
            npm: true
        });
    };

    end() {
        let q = this.spawnCommand('npm', ['install'], {cwd: './app/'});

        q.on('close', () => {
            let i = this.spawnCommand('npm', ['run', 'build:prod'], {
                cwd: process.cwd()
            });

            i.on('close', () => {
                this.log(chalk.green.bold('Done! Have fun!'));
            });
        });
    };
};
