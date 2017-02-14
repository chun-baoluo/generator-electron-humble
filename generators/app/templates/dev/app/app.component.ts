import { Component } from '@angular/core';

import <% if(cssPreprocessor == 'Stylus') { %>'./app.component.styl'<% } %><% if(cssPreprocessor == 'Less') { %>'./app.component.less'<% } %><% if(cssPreprocessor == 'Sass') { %>'./app.component.scss'<% } %>;

@Component({
    selector: 'electron-app',
    template: require('./app.component.jade')()
})

export class AppComponent {

}
