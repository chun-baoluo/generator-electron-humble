import {Component} from '@angular/core';

import './app.component.styl';

@Component({
    selector: 'electron-app',
    template: require('./app.component.jade')()
})

export class AppComponent {
	
}