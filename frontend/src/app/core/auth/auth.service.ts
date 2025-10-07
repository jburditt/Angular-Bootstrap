import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from "rxjs";
import { HttpErrorResponse } from '@angular/common/http';
import { LoggingFactory, LoggingService } from '@fullswing-angular-library';
import { AuthService } from '@app/api/services/auth.service';
import { User } from '@app/api/models';
import { StrictHttpResponse } from '@app/api/strict-http-response';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class ApiAuthenticationService
{
  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private readonly _loggingService: LoggingService;

  constructor(
    private readonly authService: AuthService,
    private readonly oauthService: OAuthService,
    private readonly loggingFactory: LoggingFactory
  ) {
    this._loggingService = loggingFactory.create(this.constructor.name);
  }

  redirectAfterLogin(azureUserInfo: any): void {
    console.log("User is logged in", azureUserInfo);
    this.whoAmI(azureUserInfo).subscribe({
      next: (_res: any) => {
        console.log('whoAmI response', _res);
        // Retrieve the state information from the service.  This will contain the original URL
        // the user requested.  Redirect the user to that URL.
        // The state value is URL encoded by the OAuthService when it is sent to the identity
        // provided and therefore needs to be decoded before conversion from base64.
        let redirectState = JSON.parse(
          this.oauthService.state ? atob(decodeURIComponent(this.oauthService.state)) : '{}'
        );
        if (redirectState.originalURL && redirectState.originalURL != window.location.href)
          // only redirect if different from current URL
          if (redirectState.originalURL != window.location.href)
            window.location.href = redirectState.originalURL;
      },
      error: (err: any) => {
        console.error('OAuth Error', err);
        this.isLoggedIn$.next(false);
      },
    });

  }

  whoAmI(azureUserInfo: any): Observable<StrictHttpResponse<User>> {
    return this.authService.apiAuthWhoamiGet$Response().pipe(
      map((response: StrictHttpResponse<User>) => {
        this._loggingService.debug("azureUserInfo.info", azureUserInfo.info);
        this._loggingService.debug("whoAmI response", response);
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        this._loggingService.error("whoAmI error", error);
        return throwError(() => error);
      })
    );
  }
}
