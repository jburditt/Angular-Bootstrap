import { Routes } from '@angular/router';

const enum AppRoutes {
  HOME = '',
  ADMIN = 'admin',
  USER = 'user',
  FEATURE = 'feature',
}

export const routes: Routes = [{
  path: '',
  children: [
    {
      path: AppRoutes.HOME,
      loadComponent: () => import('@app/modules/home.component').then(m => m.HomePageComponent)
    },
    {
      path: AppRoutes.ADMIN,
      //canActivate: [authGuard],
      loadChildren: () => import('@app/modules/admin/admin.routes')
    },
    {
      path: AppRoutes.USER,
      loadChildren: () => import('@app/modules/user/user.routes')
    },
    {
      path: AppRoutes.FEATURE,
      loadChildren: () => import('@app/modules/feature/feature.routes')
    }
  ],
}];
