import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router);
  private apiUrl = 'http://localhost:3000'; // sua API

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<{ token: string; refreshToken: string }>(`${this.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('refreshToken', res.refreshToken);
        }),
      );
  }

  // refreshToken() {
  //   const token = localStorage.getItem('refreshToken'); // Verifique se o nome aqui está correto
  //   console.log('token enviado', token);
  //   // O nome da chave 'refreshToken' tem que ser EXATAMENTE igual ao que o Node espera
  //   return this.http.post<any>(`${this.apiUrl}/refresh`, {
  //     refreshToken: token,
  //   });
  // }
  refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken'); // ou seu método de pegar o token

    return this.http.post<any>('http://localhost:3000/refresh', { refreshToken }).pipe(
      tap((res) => {
        // É CRUCIAL salvar os novos tokens aqui!
        if (res.token) localStorage.setItem('token', res.token);
        if (res.refreshToken) localStorage.setItem('refreshToken', res.refreshToken);
      }),
    );
  }

  getToken() {
    const token = localStorage.getItem('token');

    if (!token) return null;

    return token.trim();
  }

  saveTokens(tokens: AuthResponse) {
    localStorage.setItem('token', tokens.token);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
