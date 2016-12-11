import {Component} from '@angular/core';

import <% if(props.cssPreprocessor == 'Stylus') { %>'./app.component.styl'<% } %><% if(props.cssPreprocessor == 'Less') { %>'./app.component.less'<% } %><% if(props.cssPreprocessor == 'Sass') { %>'./app.component.scss'<% } %>;

@Component({
    selector: 'electron-app',
    template: require('./app.component.jade')()
})

export class AppComponent {
	
}