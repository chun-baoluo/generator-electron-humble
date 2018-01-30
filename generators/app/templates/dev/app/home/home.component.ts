import { Component } from '@angular/core';

@Component({
    selector: 'home-component',
    template: <% if(templateEngine) { %>require('./home.component.pug')()<% } else { %> require('./home.component.html') <% } %>
})
export class HomeComponent {<% if(materialDesign) { %>
	private pressed: boolean = false;<% } %>
};
