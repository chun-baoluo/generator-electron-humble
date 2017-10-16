import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing, routingProviders } from './app.routing';
import { HomeComponent } from './home/home.component';<% if(materialDesign == true) { %>
import { MatButtonModule } from '@angular/material';<% } %>

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        routing<% if(materialDesign == true) { %>,
        MatButtonModule<% } %>
    ],
    providers: [routingProviders],
    bootstrap: [AppComponent]
})

export class AppModule {}
