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
        appName: path.basename(process.cwd()),
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
        type: 'confirm',
        name: 'templateEngine',
        message: 'Would you like to use Pug (Jade) template engine?',
        default: true
      }, {
        type: 'confirm',
        name: 'materialDesign',
        message: 'Would you like to use Angular 2 Material?',
        default: true
      }];

      this.prompt(prompts).then(function(answers) {
        this.data.appName = answers.appName;
        this.data.cssPreprocessor = answers.cssPreprocessor;
        this.data.templateEngine = answers.templateEngine;
        this.data.materialDesign = answers.materialDesign;

        done();
      }.bind(this));
    };

    writing() {

      this.fs.copy(
        this.templatePath('./app'),
        this.destinationPath('./app')
      );
      
      if(this.data.templateEngine == true) {
        this.fs.copy(
          this.templatePath('./dev/index.pug'),
          this.destinationPath('./dev/index.pug')
        );
      } else {
        this.fs.copy(
          this.templatePath('./dev/index.html'),
          this.destinationPath('./dev/index.html')
        );        
      };

      this.fs.copy(
        this.templatePath('./dev/main.ts'),
        this.destinationPath('./dev/main.ts')
      );

      this.fs.copy(
        this.templatePath('./dev/polyfills.ts'),
        this.destinationPath('./dev/polyfills.ts')
      );

      this.fs.copy(
        this.templatePath('./dev/vendor.ts'),
        this.destinationPath('./dev/vendor.ts')
      );

      if(this.data.templateEngine == true) {
        this.fs.copy(
          this.templatePath('./dev/app/app.component.pug'),
          this.destinationPath('./dev/app/app.component.pug')
        );
      } else {
        this.fs.copy(
          this.templatePath('./dev/app/app.component.html'),
          this.destinationPath('./dev/app/app.component.html')
        );       
      };

      this.fs.copyTpl(
        this.templatePath('./dev/app/app.component.ts'),
        this.destinationPath('./dev/app/app.component.ts'),
        this.data
      );

      this.fs.copyTpl(
        this.templatePath('./dev/app/app.module.ts'),
        this.destinationPath('./dev/app/app.module.ts'),
        this.data
      );

      this.fs.copy(
        this.templatePath('./dev/app/app.routing.ts'),
        this.destinationPath('./dev/app/app.routing.ts')
      );

      if(this.data.cssPreprocessor == 'Stylus') {
        this.fs.copy(
          this.templatePath('./dev/app/app.component.styl'),
          this.destinationPath('./dev/app/app.component.styl')
        );
      } else if(this.data.cssPreprocessor == 'Less') {
        this.fs.copy(
          this.templatePath('./dev/app/app.component.less'),
          this.destinationPath('./dev/app/app.component.less')
        );
      } else if(this.data.cssPreprocessor == 'Sass') {
        this.fs.copy(
          this.templatePath('./dev/app/app.component.scss'),
          this.destinationPath('./dev/app/app.component.scss')
        );
      }

      if(this.data.templateEngine == true) {
        this.fs.copyTpl(
          this.templatePath('./dev/app/home/home.component.pug'),
          this.destinationPath('./dev/app/home/home.component.pug'),
          this.data
        );
      } else {
        this.fs.copyTpl(
          this.templatePath('./dev/app/home/home.component.html'),
          this.destinationPath('./dev/app/home/home.component.html'),
          this.data
        );
      };

      this.fs.copyTpl(
        this.templatePath('./dev/app/home/home.component.ts'),
        this.destinationPath('./dev/app/home/home.component.ts'),
        this.data
      );

      this.fs.copy(
        this.templatePath('./dev/app/home/icon.png'),
        this.destinationPath('./dev/app/home/icon.png')
      );

      this.fs.copy(
        this.templatePath('./tsconfig.json'),
        this.destinationPath('./tsconfig.json')
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
      var q = this.spawnCommand('npm', ['install'], {cwd: './app/'});

      q.on('close', () => {
        var i = this.spawnCommand('npm', ['run-script', 'webpack'], {
          cwd: process.cwd()
        });
      
        i.on('close', () => {
          this.log(chalk.green.bold('Done! Have fun!'));
        });
      });
    };
};
