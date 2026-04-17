import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router);
  private apiUrl = 'http://localhost:3000'; // sua API

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
        }),
      );
  }

  getToken() {
    const token = localStorage.getItem('token');

    if (!token) return null;

    return token.trim();
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
