import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { Settings } from 'luxon';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient()
  ]
};

// Force all Luxon instances to use a specific zone (e.g., UTC or New York)
Settings.defaultZone = 'utc'; 
// Set the default locale for formatting
Settings.defaultLocale = 'en-GB';
