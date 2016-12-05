'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.Base.extend({

  initializing: function () {
    this.props = {};
    this.props.appName = this.name || path.basename(process.cwd());
  },

  prompting: function () {
    this.log(yosay(
      'Yo! Welcome to the humble ' + chalk.blue('electron') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'What is the name of your application?',
      default: this.props.appName
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {

    this.fs.copy(
      this.templatePath('./app'),
      this.destinationPath('./app')
    );

    this.fs.copy(
      this.templatePath('./dev'),
      this.destinationPath('./dev')
    );

    this.fs.copy(
      this.templatePath('./tsconfig.json'),
      this.destinationPath('./tsconfig.json')
    );

    this.fs.copy(
      this.templatePath('./tslint.json'),
      this.destinationPath('./tslint.json')
    );

    this.fs.copy(
      this.templatePath('./webpack.config.js'),
      this.destinationPath('./webpack.config.js')
    );

    this.fs.copy(
      this.templatePath('./gitignore'),
      this.destinationPath('./.gitignore')
    );

    this.fs.copyTpl(
      this.templatePath('./app/package.json'),
      this.destinationPath('./app/package.json'),
      this
    );

    this.fs.copyTpl(
      this.templatePath('./package.json'),
      this.destinationPath('./package.json'),
      this
    );
  },

  install: function () {
    var self = this;
    self.installDependencies({bower: false, npm: true, callback: function() {
      var q = self.spawnCommand('npm', ['install'], {cwd: './app/'});

      q.on('close', function() {
        var i = self.spawnCommand('npm', ['start'], {cwd: process.cwd()});
      
        i.on('close', function() {
          self.log(chalk.green('Done! Have fun!'));
        });
      });
        
    }});
  },

  end: function() {
    
  }
});
