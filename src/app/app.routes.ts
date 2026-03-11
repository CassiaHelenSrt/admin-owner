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
      {
        path: 'products',
        loadComponent: () =>
          import('./features/admin/pages/products/products.component').then(
            (m) => m.ProductsComponent,
          ),
      },
      {
        path: 'scheduling',
        loadComponent: () =>
          import('./features/admin/pages/scheduling/scheduling.component').then(
            (m) => m.SchedulingComponent,
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/admin/pages/users/users.component').then((m) => m.UsersComponent),
      },
      {
        path: 'payments',
        loadComponent: () =>
          import('./features/admin/pages/payments/payments.component').then(
            (m) => m.Paymentscomponent,
          ),
      },
      {
        path: 'campaign',
        loadComponent: () =>
          import('./features/admin/pages/campaigns/campaigns.component').then(
            (m) => m.CampaignsComponent,
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
