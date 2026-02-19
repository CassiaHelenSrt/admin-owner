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
      import('./layout/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),

    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
    ],
  },

  // Redirecionamento final (sempre por último)
  {
    path: '**',
    redirectTo: 'login',
  },
];
