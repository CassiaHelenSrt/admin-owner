import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from '@shared/components/toast/toast';
import { LoadingComponent } from './core/components/loading/loading.component';
import { LoadingService } from './core/services/loading.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastComponent, LoadingComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  protected readonly title = signal('admin-owner');

  private loadingService = inject(LoadingService);

  loading$ = this.loadingService.loading$;

  loading = toSignal(this.loadingService.loading$, { initialValue: false });
}
