import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "@fullswing-angular-library";
import { Observable, map, of, tap } from 'rxjs';
import { ConfigService } from '@fullswing-angular-library';

export const AuthGuard = (): Observable<boolean> => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);
  const configService = inject(ConfigService);

  return authService.isLoggedIn$.pipe(
    map((isLoggedIn) => {
      if (!isLoggedIn) {
        // TODO check config is not already loaded
        // TODO this doesn't actually work. The commented out authentication code on main.ts does
        configService.loadConfig$().subscribe(() => {
          authService.init();
        });
        router.navigate(['/admin/denied']);
      }
      return isLoggedIn;
    }));
};
