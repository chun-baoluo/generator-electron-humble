import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';<% if(materialDesign) { %>
import { MatButtonModule, MatInputModule } from '@angular/material';<% } %>

import { AppComponent } from './app.component';
import { routing, routingProviders } from './app.routing';
import { HomeComponent } from './home/home.component';

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
        routing<% if(materialDesign) { %>,
        MatButtonModule,
        MatInputModule<% } %>
    ],
    providers: [routingProviders],
    bootstrap: [AppComponent]
})

export class AppModule {

    constructor(public appRef: ApplicationRef) {};

    hmrOnInit(store: any) {
        if(!store || !store.state) return;

        console.log('HMR store', store);

        if('restoreInputValues' in store) {
            store.restoreInputValues();
        };

        this.appRef.tick();

        delete store.state;
        delete store.restoreInputValues;
    };

    hmrOnDestroy(store: any) {
        let cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);

        store.disposeOldHosts = createNewHosts(cmpLocation);

        store.state = {};

        store.restoreInputValues  = createInputTransfer();

        removeNgStyles();
    };

    hmrAfterDestroy(store: any) {
        store.disposeOldHosts()
        delete store.disposeOldHosts;
    };
};
