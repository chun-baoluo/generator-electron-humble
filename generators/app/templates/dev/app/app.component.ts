import { Component } from '@angular/core';

import <% if(cssPreprocessor == 'Stylus') { %>'./app.component.styl'<% } %><% if(cssPreprocessor == 'Less') { %>'./app.component.less'<% } %><% if(cssPreprocessor == 'Sass') { %>'./app.component.scss'<% } %>;

@Component({
    selector: 'electron-app',
    template: <% if(templateEngine == true) { %>require('./app.component.pug')()<% } else { %> require('./app.component.html') <% } %>
})

export class AppComponent {

}
