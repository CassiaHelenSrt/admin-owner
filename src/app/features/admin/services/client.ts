import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:3000/client';

  constructor(private http: HttpClient) {}

  getClients() {
    return this.http.get(this.apiUrl);
  }
}
