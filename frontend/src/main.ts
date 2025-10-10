import { AppComponent } from '@app/app.component';
import { importProvidersFrom, inject, provideAppInitializer } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from '@app/app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { provideConfigService, ConfigService, provideLoggingService, provideErrorHandler, provideToastService, provideHttpInterceptor, provideOAuthService, AuthenticationService, TokenInterceptor } from "@fullswing-angular-library";
import { ApiAuthenticationService } from '@app/core/auth/api-auth.service';

import { NgxUiLoaderModule, NgxUiLoaderConfig, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#267591',
  bgsType: 'square-loader',
  bgsSize: 100
};

// ngrx/store
//import { provideStore, provideState, StoreModule } from '@ngrx/store';
//import { playerReducer } from "@features/rpg/store/player.reducer";
//import { hydrationMetaReducer } from '@app/features/rpg/store/hydration.reducer';

export async function initializeApp(): Promise<boolean>
{
  const configService = inject(ConfigService);
  // uncomment for site-wide authentication required
  // const authService = inject(AuthenticationService);
  // const authenticationApi = inject(ApiAuthenticationService);

  // authService.isLoggedIn$.subscribe((isLoggedIn) => {
  //   if (isLoggedIn) {
  //     authenticationApi.redirectAfterLogin(authService.azureUserInfo);
  //   }
  // });

  return await firstValueFrom(configService.loadConfig$())
  //  .then(() => authService.init());
}

bootstrapApplication(AppComponent, {
  providers: [
    provideAppInitializer(initializeApp),
    ApiAuthenticationService,
    provideOAuthService(),
    provideAnimations(),
    provideRouter(routes, withComponentInputBinding()),
    provideErrorHandler(),
    provideHttpInterceptor(),
    provideHttpClient(withInterceptorsFromDi()),
    provideConfigService(),
    provideLoggingService(),
    provideToastService(),
    importProvidersFrom(
      NgxUiLoaderHttpModule,
      NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
      NgxUiLoaderRouterModule.forRoot({ showForeground: false })
    ),
    // ngrx/store
    //provideStore({ player: playerReducer }),
    //provideState({ name: 'player', reducer: playerReducer }),
]
})
  .catch(err => console.error(err));
