import { Injectable } from '@angular/core';
import { BehaviorSubject, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  // private loadingSubject = new BehaviorSubject(false);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  // loading$ = this.loadingSubject.asObservable();
  loading$ = this.loadingSubject.asObservable().pipe(delay(0));

  show() {
    console.log('SHOW');

    this.loadingSubject.next(true);
  }

  hide() {
    console.log('HIDE');

    this.loadingSubject.next(false);
  }
}
