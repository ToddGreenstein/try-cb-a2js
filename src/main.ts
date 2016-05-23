import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { TryAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(TryAppComponent);

