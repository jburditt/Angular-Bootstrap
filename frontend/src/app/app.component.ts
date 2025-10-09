import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem, MenuComponent, AuthenticationService } from '@fullswing-angular-library';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [RouterOutlet, MatIconModule, MatToolbarModule, MatButtonModule, MenuComponent, NgxUiLoaderModule, MatMenuModule, MatMenuTrigger]
})
export class AppComponent {
  menuItemList: Array<MenuItem> = [
    new MenuItem('Home', '/', 'home'),
    new MenuItem('User', '/user', 'contact_mail', [
      new MenuItem('Search', '/user/search', 'search')
    ]),
    new MenuItem('Form', '/feature', 'build', [
      new MenuItem('Flags', '/feature/flags', 'description'),
      new MenuItem('NgRx Store', '/feature/ngrx-store', 'dashboard')
    ]),
    new MenuItem('Admin', '/admin', 'settings'),
  ];

  isLoggedIn: boolean = false;

  constructor(private authService: AuthenticationService) {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  protected login() {
    // TODO config service first
    //this.authService.init();
  }

  protected logout() {
    this.authService.logout();
  }
}
