import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchedulingService {
  private apiUrl = 'http://localhost:3000';

  private http = inject(HttpClient);

  getScheduling(date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/schedules/day?date=${date}`);
  }

  getAvailableSlots(date: string, productId: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/availability/available/slots/${productId}?date=${date}`,
    );
  }
}
