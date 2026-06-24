import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  // 1. Criamos um signal privado mutável
  private visibleSignal = signal<boolean>(false);

  // 2. Expomos uma versão apenas de leitura para os componentes
  isVisible = this.visibleSignal.asReadonly();

  show() {
    console.log('SHOW');
    // 3. Atualizamos o valor usando .set()
    this.visibleSignal.set(true);
  }

  hide() {
    console.log('HIDE');
    this.visibleSignal.set(false);
  }
}
