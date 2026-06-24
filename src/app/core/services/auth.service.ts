import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, first, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponse } from '../models/auth-response';
import { User } from '@shared/interfaces/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private apiUrl = 'http://localhost:3000'; // sua API

  // 1. Criamos o Signal privado que guarda o Usuário ou null
  private currentUserSignal = signal<User | null>(null);

  // 2. Expomos o Signal como apenas leitura para o resto do app consultar
  currentUser = this.currentUserSignal.asReadonly();

  // 3. Estado Computado: Diz se está autenticado baseado no Signal acima
  // Se o usuário não for null, retorna true automaticamente!
  isAuthenticated = computed(() => this.currentUserSignal() !== null);

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    // 1. Tipamos o retorno do post incluindo a propriedade 'user' com a interface User
    return this.http
      .post<{ token: string; refreshToken: string; user: User }>(`${this.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('refreshToken', res.refreshToken);

          // 1. Salva o objeto do usuário como texto (JSON) no navegador
          localStorage.setItem('user', JSON.stringify(res.user));

          // 2. Alimenta o Signal na hora
          this.currentUserSignal.set(res.user);
        }),
      );
  }

  loadSavedUser() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        // Transforma o texto de volta em objeto e alimenta o Signal
        this.currentUserSignal.set(JSON.parse(savedUser));
      } catch (e) {
        console.error('Erro ao ler usuário do localStorage', e);
        this.logout();
      }
    }
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

  Authenticated() {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user'); // 4. Limpa o usuário do navegador no logout

    this.currentUserSignal.set(null); // 5. Zera o Signal
    this.router.navigate(['/login']);
  }
}
