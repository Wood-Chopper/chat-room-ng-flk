import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MESSAGE_CLIENT_PROVIDER } from './client/messages.client';
import { LIVE_MESSAGES_CLIENT_PROVIDER } from './client/live-messages.client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    MESSAGE_CLIENT_PROVIDER,
    LIVE_MESSAGES_CLIENT_PROVIDER
  ],
};
