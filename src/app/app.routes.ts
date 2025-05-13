import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; 

export const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard], // Add the AuthGuard here
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: '', // Default route
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**', // Wildcard route for handling invalid URLs
    redirectTo: 'login',
  }
];