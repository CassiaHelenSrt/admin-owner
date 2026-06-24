import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from '@shared/components/toast/toast';
import { LoadingComponent } from './core/components/loading/loading.component';
import { LoadingService } from './core/services/loading.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastComponent, LoadingComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  private loadingService = inject(LoadingService);
  private authService = inject(AuthService);

  // 1. Vinculamos direto ao Signal de leitura do serviço
  isVisible = this.loadingService.isVisible;

  constructor() {
    // 🔥 A MÁGICA DO F5: Lê o usuário do LocalStorage instantaneamente ao abrir o app
    this.authService.loadSavedUser();

    // Mantemos o efeito para você ver no console o usuário ativo na hora
    effect(() => {
      const usuarioAtual = this.authService.currentUser();
      console.log('--- ESTADO DO USUÁRIO ATUALIZADO ---');
      console.log('Usuário na memória:', usuarioAtual);
    });
  }
}
