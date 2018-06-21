import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import { bootloader, hmrModule } from '@angularclass/hmr';

declare let PRODUCTION: boolean;

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if(PRODUCTION) {
    enableProdMode();
    bootstrap();
} else {
    bootloader(() => {
        return bootstrap().then((ngModuleRef: any) => hmrModule(ngModuleRef, module));
    });
};
