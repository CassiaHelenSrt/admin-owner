import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then((m) => m.LoginComponent),
  },
  //   {
  //     path: 'dashboard',
  //     canActivate: [authGuard],
  //     loadComponent: () =>
  //       import('./features/dashboard/pages/dashboard/dashboard.component').then(
  //         (m) => m.DashboardComponent,
  //       ),
  //   },
];
