import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';  // Import tap

@Injectable({ providedIn: 'root' })
export class AuthService {
  private URL = 'https://personal-expensetracker-backend-673k.onrender.com/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  register(user: any) {
    return this.http.post(`${this.URL}/register`, user);
  }

  login(user: any) {
    return this.http.post<{ token: string }>(`${this.URL}/login`, user)
      .pipe(  // Use pipe and tap
        tap(response => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/dashboard']); // Redirect on successful login
          } else {
            console.error('Token not found in response');
            // Handle the error appropriately, maybe show a message to the user
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}