import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, filter, finalize, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HttpContextToken } from '@angular/common/http';

export const RETRY_REQUEST = new HttpContextToken<boolean>(() => false);

let isRefreshing = false;
let refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // 1. Não intercepta a própria rota de refresh
  if (req.url.includes('/refresh')) {
    return next(req);
  }

  // 2. Adiciona o token atual na requisição
  const token = authService.getToken();
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Se o erro não for 401, apenas repassa o erro
      if (error.status !== 401) {
        return throwError(() => error);
      }

      // Se já tentou retry e deu 401 de novo → logout
      if (error.status === 401 && req.context.get(RETRY_REQUEST)) {
        authService.logout();
        router.navigate(['/login']);
        return throwError(() => error);
      }
      // Se já estiver acontecendo um refresh, esperamos o novo token
      if (isRefreshing) {
        return refreshTokenSubject.pipe(
          filter((t): t is string => t !== null), // Aguarda até que o token não seja nulo
          take(1), // Pega o primeiro valor e encerra o pipe
          switchMap((newToken) => {
            return next(
              req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` },
              }),
            );
          }),
        );
      }

      // Se for o primeiro 401 a chegar, inicia o processo de refresh
      isRefreshing = true;
      refreshTokenSubject.next(null); // Reseta o estado do subject

      return authService.refreshToken().pipe(
        switchMap((res) => {
          // IMPORTANTE: Salve os tokens novos no Storage!
          authService.saveTokens(res);

          // Notifica todas as requisições que estavam esperando na fila
          refreshTokenSubject.next(res.token);

          // 2. REPETE A REQUISIÇÃO: Isso aqui é o que faz o POST vermelho sumir
          // e ser substituído por um POST preto de sucesso.
          const retryReq = req.clone({
            setHeaders: { Authorization: `Bearer ${res.token}` },
            context: req.context.set(RETRY_REQUEST, true),
          });

          return next(retryReq); // <--- Isso "re-executa" o POST automaticamente
        }),
        catchError((refreshError) => {
          // Se o refresh falhar (ex: refresh token expirou no banco)

          refreshTokenSubject.next(null);
          authService.logout();
          router.navigate(['/login']);
          return throwError(() => refreshError);
        }),
        finalize(() => {
          isRefreshing = false;
        }),
      );
    }),
  );
};
