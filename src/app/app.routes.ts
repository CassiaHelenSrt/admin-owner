import { Routes } from '@angular/router';

export const routes: Routes = [
  // Login (público)
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then((m) => m.LoginComponent),
  },

  // Rotas com layout
  {
    path: '',
    loadComponent: () =>
      import('./core/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),

    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/admin/pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'client',
        loadComponent: () =>
          import('./features/admin/pages/client/client.component').then((m) => m.ClientComponent),
      },
    ],
  },

  // Redirecionamento final (sempre por último)
  {
    path: '**',
    redirectTo: 'login',
  },
];
