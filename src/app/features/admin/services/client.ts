import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getClients() {
    return this.http.get(`${this.apiUrl}/client`);
  }

  createClient(clientData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/client`, clientData);
  }
}
