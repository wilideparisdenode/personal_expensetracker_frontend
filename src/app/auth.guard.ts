import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  router = inject(Router);

  
  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      // Token exists, allow access
      return true;
    } else {
      // No token, redirect to login
      this.router.navigate(['/login']);
      return false;
    }
  }
}