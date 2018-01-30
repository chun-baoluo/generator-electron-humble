import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';<% if(hmr) { %>
import { bootloader, hmrModule } from '@angularclass/hmr';<% } %>

declare let PRODUCTION: boolean;

if(PRODUCTION) {
    enableProdMode();
};

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

<% if(hmr) { %>
bootloader(() => {
    return bootstrap().then((ngModuleRef: any) => hmrModule(ngModuleRef, module));
});
<% } else { %>
bootstrap();
<% } %>
