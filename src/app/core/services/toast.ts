import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new Subject<any>();

  toastState = this.toastSubject.asObservable();

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  warning(message: string) {
    this.show(message, 'warning');
  }

  info(message: string) {
    this.show(message, 'info');
  }

  hide() {
    this.toastSubject.next(null);
  }

  private show(message: string, type: string) {
    this.toastSubject.next({
      message,
      type,
    });
  }
}
