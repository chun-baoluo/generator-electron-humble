import { Component } from '@angular/core';<% if(materialDesign == true) { %>
import '../../node_modules/@angular/material/prebuilt-themes/indigo-pink.css';
import '../../node_modules/material-design-icons/iconfont/material-icons.css';<% } %>
import <% if(cssPreprocessor == 'Stylus') { %>'./app.component.styl'<% } %><% if(cssPreprocessor == 'Less') { %>'./app.component.less'<% } %><% if(cssPreprocessor == 'Sass') { %>'./app.component.scss'<% } %>;

@Component({
    selector: 'electron-app',
    template: <% if(templateEngine == true) { %>require('./app.component.pug')()<% } else { %> require('./app.component.html') <% } %>
})

export class AppComponent {
    <% if(hmr) { %>
    private text: string = '';<% } %>
}
