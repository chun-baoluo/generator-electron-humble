import { NgModule<% if(hmr) { %>, ApplicationRef <% } %>} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing, routingProviders } from './app.routing';
import { HomeComponent } from './home/home.component';<% if(materialDesign || hmr) { %>
import { MatButtonModule, MatInputModule } from '@angular/material';<% } %><% if(hmr) { %>
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';<% } %>

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
        routing<% if(materialDesign || hmr) { %>,
        MatButtonModule,
        MatInputModule<% } %>
    ],
    providers: [routingProviders],
    bootstrap: [AppComponent]
})

export class AppModule {<% if(hmr) { %>

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
        var cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);

        store.disposeOldHosts = createNewHosts(cmpLocation);

        store.restoreInputValues  = createInputTransfer();

        removeNgStyles();
    };
    
    hmrAfterDestroy(store: any) {
        store.disposeOldHosts()
        delete store.disposeOldHosts;
    };
}<% } else { %> } <% } %>
